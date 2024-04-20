using dotnetWebAPI.Interfaces;
using dotnetWebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace dotnetWebAPI.Services
{
    public class CitiesService: ICitiesService
    {
        IDbContext dbContext;
        public CitiesService(IDbContext dbContext) 
        {
            this.dbContext = dbContext;
        }

        public async Task AddCity(string name)
        {
            dbContext.Cities.Add(new City() {  Name = name });

            await dbContext.SaveChangesAsync();
        }

        public async Task<List<string>> GetCities()
        {
            List<City> cities = await dbContext.Cities.ToListAsync();

            List<string> citiesName = new List<string>();

            foreach (City city in cities)
            {
                citiesName.Add(city.Name);
            }

            return citiesName;
        }
    }
}
