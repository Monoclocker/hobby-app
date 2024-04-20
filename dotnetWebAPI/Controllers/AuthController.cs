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
                    byte[] bytes = new byte[photo.Length];
                    dto.photo = bytes.ToList();
                }

                else 
                {
                    dto.photo = null;
                }
                await authService.RegisterUser(dto);

                return Ok();
            }

            catch (Exception ex)
            {
                logger.Log(LogLevel.Error, ex.Message);
                return BadRequest();
            }
        }

        [HttpPost("Refresh")]
        public IActionResult Refresh(TokensDTO dto)
        {
            try
            {
                TokensDTO tokens = authService.RefreshToken(dto);
                return Ok(tokens);
            }
            catch
            {
                return Forbid();
            }
        }
    }
}
