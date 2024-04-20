using dotnetWebAPI.DTO;
using dotnetWebAPI.Exceptions;
using dotnetWebAPI.Interfaces;
using dotnetWebAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

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
                Password = dto.password,
                About = dto.about,
                Age = dto.age,
                CityID = (await dbContext.Cities.FirstOrDefaultAsync(x => x.Name == dto.cityName))!.Id,
                Photo = dto.photo,
            };

            List<Interest> interests = new List<Interest>();

            foreach (var interest in dto.interests)
            {
                newUser.Interests.Add(dbContext.Interests.First(x => x.Name == interest));
            }

            foreach (var links in dto.links!)
            {
                newUser.SocialLinks.Add(new SocialLink() { Link = links });
            }

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

        public TokensDTO RefreshToken(TokensDTO token)
        {

            var claims = tokenService.VerifyToken(token.refreshToken!);

            if (claims == null)
            {
                throw new Exception();
            }

            string username = claims.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Name)!.Value;

            return new TokensDTO()
            {
                accessToken = tokenService.GenerateToken(new UserLoginDTO() { username = username, password = " " }, 60),
                refreshToken = tokenService.GenerateToken(new UserLoginDTO() { username = username, password = " " }, 6000)
            };
        } 
    }
}
