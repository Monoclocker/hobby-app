namespace dotnetWebAPI.Interfaces
{
    public interface ICitiesService
    {
        Task AddCity(string name);
        Task<List<string>> GetCities();
    }
}
