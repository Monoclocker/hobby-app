﻿using dotnetWebAPI.DTO;
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

        [Authorize]
        [HttpGet("GetInfo")]
        public async Task<IActionResult> GetMapInfo()
        {
            string username = User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Name)!.Value;

            MapInfoDTO dto = new MapInfoDTO();

            try
            {
                dto.username = username;

                List<float> coordinates = await profileService.GetLastCoordinates(username);

                dto.coordinates = coordinates;

                List<GroupCoordinates> friends = await groupsService.GetGroupCoordinatesByUsername(username);

                dto.friends = friends;

                List<PlaceDTO> places = await placesService.GetPlaces(username);

                dto.places = places;

                return Ok(dto);

            }
            catch(Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
