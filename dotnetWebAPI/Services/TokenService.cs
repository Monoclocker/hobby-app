using dotnetWebAPI.DTO;
using dotnetWebAPI.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace dotnetWebAPI.Services
{
    public class TokenService : ITokenService
    {

        readonly IConfiguration configuration;

        public TokenService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public string GenerateToken(UserLoginDTO dto, int lifeDurationSeconds)
        {

            List<Claim> claims = new List<Claim>()
            {
                new Claim(type: ClaimTypes.Name, dto.username)
            };

            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor()
            {
                Issuer = configuration["Issuer"],
                Expires = DateTime.UtcNow.AddMinutes(lifeDurationSeconds),
                Claims = claims.ToDictionary(x=>x.Type, x=>(object)x.Value),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["key"]!)), SecurityAlgorithms.HmacSha256)
            };

            SecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public ClaimsPrincipal? VerifyToken(string token)
        {
            JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();

            TokenValidationParameters validationParameters = new TokenValidationParameters()
            {
                ClockSkew = TimeSpan.FromSeconds(0),
                ValidateIssuer = true,
                ValidateLifetime = true,
                ValidateAudience = false,
                ValidIssuer = configuration["Issuer"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["key"]!))
            };

            SecurityToken verifiedToken;

            if (handler.CanReadToken(token))
            {
                try
                {
                    ClaimsPrincipal claims = handler.ValidateToken(token, validationParameters, out verifiedToken);
                    return claims;
                }
                catch
                {
                    return null;
                }
            }
            return null;
        }

    }
}
