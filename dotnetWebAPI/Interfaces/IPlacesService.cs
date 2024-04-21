using dotnetWebAPI.DTO;

namespace dotnetWebAPI.Interfaces
{
    public interface IPlacesService
    {
        Task<List<PlaceDTO>> GetPlaces(string username);
        Task<List<PlaceDTO>> GetAllPlaces();

        Task DeletePlace(int id);

        Task CreatePlace(PlaceDTO dto);
    }
}
