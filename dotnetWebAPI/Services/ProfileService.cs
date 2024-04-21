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
            User? findedProfile = await dbContext.Users
                .Include(x=>x.City)
                .Include(x=>x.Interests)
                .Include(x=>x.SocialLinks)
                .FirstOrDefaultAsync(x => x.Username == username);

            if (findedProfile == null)
            {
                throw new UnknownUserException();
            }

            ProfileDTO profile = new ProfileDTO()
            {
                username = findedProfile.Username,
                about = findedProfile.About,
                photo = findedProfile.Photo,
                age = findedProfile.Age,
                cityName = findedProfile.City.Name,
            };

            
            foreach (var Links in findedProfile.SocialLinks)
            {
                profile.links!.Add(Links.Link);
            }

            foreach (var interest in findedProfile.Interests) 
            {
                profile.interests!.Add(interest.Name);
            }

            return profile;
        }

        public async Task UpdateProfile(ProfileDTO dto)
        {
            User? profile = await dbContext.Users
                .Include(x=>x.Interests)
                .Include(x=>x.SocialLinks)
                .FirstOrDefaultAsync(x => x.Username == dto.username);

            if (profile == null)
            {
                throw new UnknownUserException();
            }

            if (dto.about != null)
            {
                profile.About = dto.about;
            }

            if (dto.cityName != null)
            {
                profile.City = await dbContext.Cities.FirstAsync(x => x.Name == dto.cityName);
            }

            if (dto.interests != null)
            {
                profile.Interests.Clear();

                foreach (var name in dto.interests!)
                {
                    var interest = dbContext.Interests.First(x => x.Name == name);
                    profile.Interests.Add(interest);
                }
            }

            if (dto.links != null)
            {
                profile.SocialLinks.Clear();

                foreach (var linkname in dto.links!)
                {
                    profile.SocialLinks.Add(new SocialLink() { Link = linkname });
                }
            }

            if (dto.age > 0)
            {
                profile.Age = dto.age;
            }

            if (dto.photo != null)
            {
                profile.Photo = dto.photo;
            }

            dbContext.Users.Update(profile);

            await dbContext.SaveChangesAsync();
        }

        public async Task AddSocialLink(string type, string link, string username)
        {
            User? findedProfile = await dbContext.Users
                .FirstOrDefaultAsync(x => x.Username == username);

            if (findedProfile == null)
            {
                throw new UnknownUserException();
            }

            findedProfile.SocialLinks.Add(new SocialLink() { Link = link });

            await dbContext.SaveChangesAsync();
        }

        public async Task<List<float>> GetLastCoordinates(string username)
        {
            List<float> coorinates = new List<float>();

            User? user = await dbContext.Users.Include(x=>x.LastCoordinates).FirstOrDefaultAsync(x => x.Username == username);

            if(user == null)
            {
                throw new UnknownUserException();
            }

            if (user.LastCoordinates != null && 
                user.LastCoordinates.Latitude != null && 
                user.LastCoordinates.Longitude != null)
            {
                coorinates.Add((float)user.LastCoordinates.Latitude);
                coorinates.Add((float)user.LastCoordinates.Longitude);
            }

            return coorinates;
        }

        public async Task SaveLastCoordinates(string username, List<float> coordinates)
        {
            User? user = await dbContext.Users.Include(x => x.LastCoordinates).FirstOrDefaultAsync(x => x.Username == username);

            if (user == null)
            {
                throw new UnknownUserException();
            }

            if(user.LastCoordinates == null)
            {
                user.LastCoordinates = new LastCoordinates();
            }

            user.LastCoordinates.Latitude = coordinates[0];
            user.LastCoordinates.Longitude = coordinates[1];

            await dbContext.SaveChangesAsync();

        }


    }
}