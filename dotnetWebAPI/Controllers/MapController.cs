using dotnetWebAPI.DTO;
using dotnetWebAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace dotnetWebAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MapController : ControllerBase
    {
        IGroupsService groupsService;
        IPlacesService placesService;
        IProfileService profileService;

        public MapController(
            IGroupsService groupsService, 
            IProfileService profileService, 
            IPlacesService placesService)
        {
            this.groupsService = groupsService;
            this.profileService = profileService;
            this.placesService = placesService;
        }


        public record class Coordinates(List<float> coords);

        [Authorize]
        [HttpPost("SaveCoordinates")]
        public async Task<IActionResult> SaveCoordinates(Coordinates _dto)
        {
            string username = User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Name)!.Value;

            await profileService.SaveLastCoordinates(username, _dto.coords);

            return Ok();
        }


        [Authorize]
        [HttpPost("GetInfo")]
        public async Task<IActionResult> GetMapInfo()
        {
            string username = User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Name)!.Value;
            try
            {
                MapInfoDTO dto = new MapInfoDTO();

                dto.username = username;

                List<float> coordinates = await profileService.GetLastCoordinates(username);

                dto.coordinates = coordinates;

                List<GroupCoordinates> friends = await groupsService.GetGroupCoordinatesByUsername(username);

                dto.friends = friends;

                List<PlaceDTO> places = await placesService.GetPlaces(username);

                dto.places = places;

                return Ok(dto);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("CreatePlace")]
        public async Task<IActionResult> CreatePlace(PlaceDTO dto)
        {
            try
            {
                await placesService.CreatePlace(dto);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetAllPlaces")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                List<PlaceDTO> places = await placesService.GetAllPlaces();
                return Ok(places);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
