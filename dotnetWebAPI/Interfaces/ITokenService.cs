using dotnetWebAPI.DTO;
using System.Security.Claims;

namespace dotnetWebAPI.Interfaces
{
    public interface ITokenService
    {
        string GenerateToken(UserLoginDTO dto, int lifeDuration);
        ClaimsPrincipal? VerifyToken(string token);
    }
}
