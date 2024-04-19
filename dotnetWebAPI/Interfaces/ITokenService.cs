using dotnetWebAPI.DTO;

namespace dotnetWebAPI.Interfaces
{
    public interface ITokenService
    {
        string GenerateToken(UserLoginDTO dto, int lifeDuration);
        bool VerifyToken(string token);
    }
}
