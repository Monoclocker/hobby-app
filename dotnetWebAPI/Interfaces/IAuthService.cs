using dotnetWebAPI.DTO;

namespace dotnetWebAPI.Interfaces
{
    public interface IAuthService
    {
        Task RegisterUser(UserRegisterDTO dto, IFormFile? formFile = null);
        Task<TokensDTO> LoginUser(UserLoginDTO dto);
    }
}
