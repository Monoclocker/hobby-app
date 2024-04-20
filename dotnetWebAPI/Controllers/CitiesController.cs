using dotnetWebAPI.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace dotnetWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CitiesController : ControllerBase
    {
        ICitiesService citiesService;

        public CitiesController(ICitiesService citiesService) 
        {
            this.citiesService = citiesService;
        }

        public record class CityDTO(string name);

        [HttpPost("AddCity")]
        public async Task AddCity(CityDTO dto)
        {
            await citiesService.AddCity(dto.name);
        }

        [HttpGet("GetCities")]
        public async Task<List<string>> GetCities()
        {
            return await citiesService.GetCities();
        }

    }
}
