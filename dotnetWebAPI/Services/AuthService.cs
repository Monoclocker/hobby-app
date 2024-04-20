using dotnetWebAPI.DTO;
using dotnetWebAPI.Exceptions;
using dotnetWebAPI.Interfaces;
using dotnetWebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace dotnetWebAPI.Services
{
    public class AuthService: IAuthService
    {

        readonly ITokenService tokenService;
        readonly IDbContext dbContext;

        public AuthService(ITokenService tokenService, IDbContext dbContext) 
        {
            this.tokenService = tokenService;
            this.dbContext = dbContext;
        }

        public async Task RegisterUser(UserRegisterDTO dto)
        {
            User newUser = new User()
            {
                Username = dto.username,
                Email = dto.email,
                Password = dto.password
            };

            Profile newProfile = new Profile()
            {
                About = dto.about,
                Age = dto.age,
                City = (await dbContext.Cities.FirstOrDefaultAsync(x=>x.Name == dto.cityName))!
            };

            await dbContext.Users.AddAsync(newUser);

            await dbContext.SaveChangesAsync();

        }

        public async Task<TokensDTO> LoginUser(UserLoginDTO dto)
        {
            User? findedUser = await dbContext.Users.FirstOrDefaultAsync(x => x.Username == dto.username
            && x.Password == dto.password);

            if (findedUser is null)
            {
                throw new UnknownUserException();
            }

            TokensDTO tokens = new TokensDTO()
            {
                accessToken = tokenService.GenerateToken(dto, 5),
                refreshToken = tokenService.GenerateToken(dto, 60)
            };

            return tokens;

        }

    }
}
