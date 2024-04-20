﻿using dotnetWebAPI.DTO;
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

            string links = "";

            foreach (var Links in findedProfile.SocialLinks)
            {
                links += "type:" + Links.Type + "link:" + Links.Link + ";";
            }

            foreach (var interest in findedProfile.Interests) 
            {
                profile.interests.Add(interest.Name);
                Console.WriteLine(interest.Name);
            }

            foreach (var interest in profile.interests)
            {
                Console.WriteLine(interest);
            }

            links.TrimEnd(';');

            profile.links = links;

            return profile;
        }

        public async Task UpdateProfile(ProfileDTO dto)
        {
            User? profile = await dbContext.Users.Include(x=>x.Interests).FirstOrDefaultAsync(x => x.Username == dto.username);

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

            profile.Interests.Clear();

            dbContext.Users.Update(profile);

            foreach (var name in dto.interests)
            {
                var interest = dbContext.Interests.First(x=>x.Name==name);
                profile.Interests.Add(interest);
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

            findedProfile.SocialLinks.Add(new SocialLink() { Link = link, Type = type });

            await dbContext.SaveChangesAsync();
        }
    }
}