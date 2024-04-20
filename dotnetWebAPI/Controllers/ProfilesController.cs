using dotnetWebAPI.DTO;
using dotnetWebAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace dotnetWebAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProfilesController : ControllerBase
    {
        IProfileService profileService;

        public ProfilesController(IProfileService profileService)
        {
            this.profileService = profileService;
        }

        [Authorize]
        [HttpGet("GetProfile")]
        public async Task<IActionResult> GetProfile()
        {
            string username = User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Name)!.Value;
            
            try
            {
                ProfileDTO dto = await profileService.GetProfile(username);
                return Ok(dto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
