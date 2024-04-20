using dotnetWebAPI.DTO;
using dotnetWebAPI.Interfaces;
using dotnetWebAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace dotnetWebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        readonly IAuthService authService;
        readonly ILogger logger;

        public AuthController(IAuthService authService, ILogger<AuthController> logger)
        {
            this.authService = authService;
            this.logger = logger;
        }

        [HttpPost("Login")]

        public async Task<IActionResult> LoginUser(UserLoginDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                TokensDTO tokens = await authService.LoginUser(dto);
                return Ok(tokens);
            }
            catch (Exception ex)
            {
                logger.Log(LogLevel.Error, ex.Message);
                return BadRequest();
            }
        }

        [HttpPost("Register")]
        public async Task<IActionResult> RegisterUser(UserRegisterDTO dto, [FromForm] IFormFile? photo = null)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                if (photo != null)
                {
                    using (FileStream fs = new FileStream(photo.FileName, FileMode.CreateNew))
                    {
                        await photo.CopyToAsync(fs);
                    }
                    dto.photo = photo.FileName;
                }
                await authService.RegisterUser(dto);
                return Ok();
            }

            catch(Exception ex)
            {
                logger.Log(LogLevel.Error, ex.Message);
                return BadRequest();
            }

        }

    }
}
