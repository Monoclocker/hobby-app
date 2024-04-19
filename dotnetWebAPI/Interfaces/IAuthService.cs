using dotnetWebAPI.DTO;

namespace dotnetWebAPI.Interfaces
{
    public interface IAuthService
    {
        Task RegisterUser(UserRegisterDTO dto);
        Task<TokensDTO> LoginUser(UserLoginDTO dto);
    }
}
