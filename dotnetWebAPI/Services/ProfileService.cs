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
                .Include(x => x.Interests)
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
                cityName = findedProfile.City.Name,
                
            };

            string links = "";

            foreach (var Links in findedProfile.SocialLinks)
            {
                links += "type:" + Links.Type + "link:" + Links.Link + ";";
            }

            foreach (var interest in  findedProfile.Interests) 
            {
                profile.interests.Add(interest.Name);
            }

            links.TrimEnd(';');

            profile.links = links;

            return profile;
        }

        public async Task UpdateProfile(ProfileDTO dto)
        {
            Profile? profile = await dbContext.Profiles.FirstOrDefaultAsync(x => x.Username == dto.username);

            if (profile == null)
            {
                throw new UnknownUserException();
            }

            if (dto.about != null)
            {
                profile.About = dto.about;
            }

            if (dto.cityName!= null)
            {
                profile.City = await dbContext.Cities.FirstAsync(x => x.Name == dto.cityName);
            }

            if (dto.age >= 0)
            {
                profile.Age = dto.age;
            }

            if (dto.photo != null)
            {
                profile.PhotoPath = dto.photo;
            }

            await dbContext.SaveChangesAsync();
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