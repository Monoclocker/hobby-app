using dotnetWebAPI.DTO;
using dotnetWebAPI.Exceptions;
using dotnetWebAPI.Interfaces;
using dotnetWebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace dotnetWebAPI.Services
{
    public class ProfileService: IProfileService
    {
        readonly IDbContext dbContext;

        public ProfileService (IDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<ProfileDTO> GetProfile(string username)
        {
            Profile? findedProfile = await dbContext.Profiles
                .Include(x => x.UserNavigation)
                .Include(x => x.City)
                .Include(x => x.SocialLinks)
                .FirstOrDefaultAsync(x => x.UserNavigation.Username == username);

            if (findedProfile == null)
            {
                throw new UnknownUserException();
            }

            ProfileDTO profile = new ProfileDTO()
            {
                about = findedProfile.About,
                photo = findedProfile.PhotoPath,
                age = findedProfile.Age,
                cityName = findedProfile.City.Name
            };

            string links = "";

            foreach (var Links in findedProfile.SocialLinks)
            {
                links += "type:" + Links.Type + "link:" + Links.Link + ";";
            }

            links.TrimEnd(';');

            profile.links = links;

            return profile;
        }

        public async Task UpdateProfile(ProfileDTO dto)
        {

        }

        public async Task AddSocialLink(string type, string link, string username)
        {
            Profile? findedProfile = await dbContext.Profiles
                .FirstOrDefaultAsync(x => x.UserNavigation.Username == username);

            if (findedProfile == null)
            {
                throw new UnknownUserException();
            }

            findedProfile.SocialLinks.Add(new SocialLink() { Link = link, Type = type });

            await dbContext.SaveChangesAsync();
        }

    }
}
