using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using JobBot_IDP.Data;
using JobBot_IDP.Models;
using BCrypt.Net;

namespace JobBot_IDP.Services
{
    public class AuthenticationService
    {
        private readonly AppDbContext _context;
        private readonly JwtSettings _jwtSettings;

        public AuthenticationService(AppDbContext context, IOptions<JwtSettings> jwtSettings)
        {
            _context = context;
            _jwtSettings = jwtSettings?.Value ?? throw new ArgumentNullException(nameof(jwtSettings));
            if (string.IsNullOrEmpty(_jwtSettings.Secret))
            {
                throw new ArgumentException("The JWT secret cannot be null or empty", nameof(_jwtSettings.Secret));
            }
        }
        public async Task<string?> Authenticate(string username, string password)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Username == username);

            if (user == null || string.IsNullOrEmpty(user.PasswordHash) || !VerifyPassword(password, user.PasswordHash))
            {
                // Handle the case where the user is not found, the password hash is null or empty, or the password verification fails
                return null;
            }

            var token = GenerateJwtToken(user);
            return token;
        }

        public async Task<bool> Register(string username, string email, string password)
        {
            if (await _context.Users.AnyAsync(u => u.Username == username))
            {
                return false; // Username already exists
            }

            var user = new User
            {
                Username = username,
                Email = email,
                PasswordHash = HashPassword(password)
            };

            _context.Users.Add(user); // TODO: need to reroute to the server JAVA side to add it to DB.
            await _context.SaveChangesAsync();

            return true;
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            if (_jwtSettings.Secret == null)
            {
                throw new ArgumentNullException(nameof(_jwtSettings.Secret), "The configuration value for JwtSettings:Secret cannot be null");
            }
            if (user.Username == null)
            {
                throw new ArgumentNullException(nameof(user.Username), "The configuration value for user.Username cannot be null");
            }
            if (user.Email == null)
            {
                throw new ArgumentNullException(nameof(user.Email), "The configuration value for user.Email cannot be null");
            }
            var key = Encoding.ASCII.GetBytes(_jwtSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("id", user.Id.ToString()),
                    new Claim("username", user.Username),
                    new Claim("email", user.Email)
                }),
                Expires = DateTime.UtcNow.AddMinutes(_jwtSettings.ExpiryMinutes),
                Issuer = _jwtSettings.Issuer,
                Audience = _jwtSettings.Audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        private bool VerifyPassword(string password, string passwordHash)
        {
            return BCrypt.Net.BCrypt.Verify(password, passwordHash);
        }
    }
}