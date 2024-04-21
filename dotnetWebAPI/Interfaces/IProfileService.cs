using dotnetWebAPI.DTO;

namespace dotnetWebAPI.Interfaces
{
    public interface IProfileService
    {
        Task<ProfileDTO> GetProfile(string username);
        Task UpdateProfile(ProfileDTO dto);
        Task AddSocialLink(string type, string link, string username);


        Task<List<float>> GetLastCoordinates(string username);
        Task SaveLastCoordinates(string username, List<float> coordinates);


    }
}
