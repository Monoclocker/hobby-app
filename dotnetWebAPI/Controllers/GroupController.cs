using dotnetWebAPI.DTO;
using dotnetWebAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace dotnetWebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class GroupController : ControllerBase
    {
        IGroupsService groupsService;

        public GroupController(IGroupsService groupsService)
        {
            this.groupsService = groupsService;
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateGroup(GroupCreationDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            string username = User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Name)!.Value;

            try
            {
                await groupsService.CreateGroup(dto, username);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAllGroups()
        {
            string username = User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Name)!.Value;

            var groups = await groupsService.GetAllGroups(username);

            return Ok(groups);
        }

        [HttpPost("Add/{id}")]
        public async Task<IActionResult> AddToGroup(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            string username = User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Name)!.Value;

            try
            {
                await groupsService.AddToGroupById(username, id);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }

        }

        [HttpPost("Remove/{id}")]
        public async Task<IActionResult> RemoveFromGroup(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            string username = User.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Name)!.Value;

            try
            {
                await groupsService.RemoveFromGroupById(username, id);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpDelete("Remove/{id}")]
        public async Task<IActionResult> DeleteGroup(int id)
        {

            try
            {
                await groupsService.DeleteGroupById(id);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("GetParticipants/{id}")]
        public async Task<IActionResult> GetGroupParticipants(int id)
        {

            try
            {
                List<string> participants = await groupsService.GetGroupParticipants(id);
                return Ok(new Dictionary<string, List<string>>() { {"participants", participants } });
            }
            catch
            {
                return BadRequest();
            }
        }

    }
}
