using System.Net.Http;
using System.Text;
using System.Text.Json;
using MySql.Data.MySqlClient;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using JobBot_IDP.Models;

namespace JobBot_IDP.Services
{
    public class UserService : IUserService
    {
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;

        public UserService(IConfiguration configuration)
        {
            _configuration = configuration;
            _httpClient = new HttpClient();
        }

        public bool ValidateUser(string username, string password)
        {
            using var connection = new MySqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            connection.Open();

            var query = "SELECT COUNT(*) FROM Users WHERE Username=@username AND Password=@password";
            using var command = new MySqlCommand(query, connection);
            command.Parameters.AddWithValue("@username", username);
            command.Parameters.AddWithValue("@password", password);

            var count = Convert.ToInt32(command.ExecuteScalar());
            return count > 0;
        }

        public async Task<bool> RegisterUser(User user)
        {
            var jsonUser = JsonSerializer.Serialize(user);
            var content = new StringContent(jsonUser, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync("http://jobbot.com/auth/register", content);
            return response.IsSuccessStatusCode;
        }

        public async Task<bool> VerifySession(string token)
        {
            var response = await _httpClient.GetAsync($"http://jobbot.com/auth/verify_session?token={token}");
            return response.IsSuccessStatusCode;
        }
    }
}