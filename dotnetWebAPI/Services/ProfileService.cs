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
                .Include(x=>x.UserNavigation)
                .Include(x=>x.City)
                .FirstOrDefaultAsync(x=>x.UserNavigation.Username == username);

            if (findedProfile == null)
            {
                throw new UnknownUserException();
            }

            ProfileDTO profile = new ProfileDTO()
            {
                name = findedProfile.Name,
                surname = findedProfile.Surname,
                about = findedProfile.About,
                photo = findedProfile.PhotoPath,
                age = findedProfile.Age,
                cityName = findedProfile.City.Name
            };

            return profile;
        }

        public async Task UpdateProfile(ProfileDTO dto)
        {

        }



    }
}
