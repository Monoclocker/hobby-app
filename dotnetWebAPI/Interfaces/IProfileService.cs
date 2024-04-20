using dotnetWebAPI.DTO;

namespace dotnetWebAPI.Interfaces
{
    public interface IProfileService
    {
        Task<ProfileDTO> GetProfile(string username);

        Task AddProfile(ProfileDTO dto);

        Task UpdateProfile(ProfileDTO dto);

    }
}
