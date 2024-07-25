// using Microsoft.AspNetCore.Mvc;
// using System.Threading.Tasks;
// using JobBot_IDP.Services;

// namespace JobBot_IDP.Controllers
// {
//     [ApiController]
//     [Route("auth")]
//     public class AuthController : ControllerBase
//     {
//         private readonly AuthenticationService _authService;

//         public AuthController(AuthenticationService authService)
//         {
//             _authService = authService;
//         }

//         [HttpPost("login")]
//         public async Task<IActionResult> Login([FromBody] LoginRequest request)
//         {
//             if (request.Username == null)
//             {
//                 // Handle the case where username is null, e.g., return a BadRequest response
//                 return BadRequest("Username cannot be null.");
//             }

//             if (request.Password == null)
//             {
//                 // Handle the case where password is null, e.g., return a BadRequest response
//                 return BadRequest("Password cannot be null.");
//             }
//             var token = await _authService.Authenticate(request.Username, request.Password);

//             if (token == null)
//             {
//                 return Unauthorized();
//             }

//             return Ok(new { Token = token });
//         }

//         [HttpPost("register")]
//         public async Task<IActionResult> Register([FromBody] RegisterRequest request)
//         {
//             if (request.Username == null)
//             {
//                 // Handle the case where username is null, e.g., return a BadRequest response
//                 return BadRequest("Username cannot be null.");
//             }

//             if (request.Email == null)
//             {
//                 // Handle the case where email is null, e.g., return a BadRequest response
//                 return BadRequest("Email cannot be null.");
//             }

//             if (request.Password == null)
//             {
//                 // Handle the case where password is null, e.g., return a BadRequest response
//                 return BadRequest("Password cannot be null.");
//             }

//             var result = await _authService.Register(request.Username, request.Email, request.Password);

//             if (!result)
//             {
//                 return BadRequest("Username already exists.");
//             }

//             return Ok("User registered successfully.");
//         }

//         [HttpGet("verify_session")]
//         public IActionResult VerifySession()
//         {
//             if (HttpContext.User.Identity?.IsAuthenticated == true)
//             {
//                 return Ok();
//             }

//             return Unauthorized();
//         }
//     }

//     public class LoginRequest
//     {
//         public string? Username { get; set; }
//         public string? Password { get; set; }
//     }

//     public class RegisterRequest
//     {
//         public string? Username { get; set; }
//         public string? Email { get; set; }
//         public string? Password { get; set; }
//     }
// }

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System;
using System.Threading.Tasks;
using JobBot_IDP.Models;
using JobBot_IDP.Services;
using Microsoft.Extensions.Configuration;

namespace JobBot_IDP.Controllers
{
    [Route("auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;

        public AuthController(IUserService userService, IConfiguration configuration)
        {
            _userService = userService;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            if (await _userService.RegisterUser(user))
            {
                var token = GenerateJwtToken(user.Username);
                return Ok(new { status = "success", token, expires_at = DateTime.UtcNow.AddHours(1).ToString("o") });
            }
            return BadRequest(new { status = "error", message = "Username already exists" });
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] User user)
        {
            Console.WriteLine("Entering the login ");
            if (_userService.ValidateUser(user.Username, user.Password))
            {
                var token = GenerateJwtToken(user.Username);
                return Ok(new { status = "success", token, expires_at = DateTime.UtcNow.AddHours(1).ToString("o") });
            }
            
            return Unauthorized(new { status = "error", message = "Invalid username or password" });
        }

        [HttpGet("verify_session")]
        public async Task<IActionResult> VerifySession([FromQuery] string token)
        {
            if (await _userService.VerifySession(token))
            {
                return Ok(new { status = "success", message = "Session verified successfully" });
            }
            return Unauthorized(new { status = "error", message = "Invalid or expired token" });
        }

        private string GenerateJwtToken(string username)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, username)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}