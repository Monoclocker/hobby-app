using dotnetWebAPI.DTO;
using dotnetWebAPI.Exceptions;
using dotnetWebAPI.Interfaces;
using dotnetWebAPI.Models;
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

            await dbContext.Users.AddAsync(newUser);

            await dbContext.SaveChangesAsync();

        }

        public async Task<TokensDTO> LoginUser(UserLoginDTO dto)
        {
            User? findedUser = await dbContext.Users.FirstOrDefaultAsync(x => x.Username == dto.username);

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
