using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using JobBot_IDP.Services;

namespace JobBot_IDP.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private readonly AuthenticationService _authService;

        public AuthController(AuthenticationService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (request.Username == null)
            {
                // Handle the case where username is null, e.g., return a BadRequest response
                return BadRequest("Username cannot be null.");
            }

            if (request.Password == null)
            {
                // Handle the case where password is null, e.g., return a BadRequest response
                return BadRequest("Password cannot be null.");
            }
            var token = await _authService.Authenticate(request.Username, request.Password);

            if (token == null)
            {
                return Unauthorized();
            }

            return Ok(new { Token = token });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (request.Username == null)
            {
                // Handle the case where username is null, e.g., return a BadRequest response
                return BadRequest("Username cannot be null.");
            }

            if (request.Email == null)
            {
                // Handle the case where email is null, e.g., return a BadRequest response
                return BadRequest("Email cannot be null.");
            }

            if (request.Password == null)
            {
                // Handle the case where password is null, e.g., return a BadRequest response
                return BadRequest("Password cannot be null.");
            }

            var result = await _authService.Register(request.Username, request.Email, request.Password);

            if (!result)
            {
                return BadRequest("Username already exists.");
            }

            return Ok("User registered successfully.");
        }

        [HttpGet("verify_session")]
        public IActionResult VerifySession()
        {
            if (HttpContext.User.Identity?.IsAuthenticated == true)
            {
                return Ok();
            }

            return Unauthorized();
        }
    }

    public class LoginRequest
    {
        public string? Username { get; set; }
        public string? Password { get; set; }
    }

    public class RegisterRequest
    {
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
    }
}