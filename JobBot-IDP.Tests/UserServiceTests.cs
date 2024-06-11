using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using JobBot_IDP.Models;
using JobBot_IDP.Services;
using Microsoft.Extensions.Configuration;
using Moq;
using Moq.Protected;
using Xunit;

namespace JobBot.Tests
{
    public class UserServiceTests
    {
        private readonly Mock<IConfiguration> _configurationMock;
        private readonly Mock<HttpMessageHandler> _httpMessageHandlerMock;
        private readonly UserService _userService;

        public UserServiceTests()
        {
            _configurationMock = new Mock<IConfiguration>();
            _httpMessageHandlerMock = new Mock<HttpMessageHandler>();

            var httpClient = new HttpClient(_httpMessageHandlerMock.Object);
            _userService = new UserService(_configurationMock.Object);
        }

        [Fact]
        public async Task RegisterUser_ShouldReturnTrue_WhenRegistrationIsSuccessful()
        {
            // Arrange
            var user = new User { Username = "test", Email = "test@example.com", Password = "password" };

            _httpMessageHandlerMock.Protected()
                .Setup<Task<HttpResponseMessage>>(
                    "SendAsync",
                    ItExpr.IsAny<HttpRequestMessage>(),
                    ItExpr.IsAny<CancellationToken>()
                )
                .ReturnsAsync(new HttpResponseMessage
                {
                    StatusCode = HttpStatusCode.OK,
                    Content = new StringContent("{\"status\":\"success\"}"),
                });

            // Act
            var result = await _userService.RegisterUser(user);

            // Assert
            Assert.True(result);
        }

        // [Fact]
        // public void ValidateUser_ShouldReturnTrue_WhenCredentialsAreValid()
        // {
        //     // Arrange
        //     var connectionString = "server=localhost;database=mydb;user=myuser;password=mypassword;";
        //     _configurationMock.Setup(c => c.GetConnectionString("DefaultConnection")).Returns(connectionString);

        //     // Implement your MySQL mocking strategy here
        //     MockMySqlUser("testuser", "testpassword");

        //     // Act
        //     var result = _userService.ValidateUser("testuser", "testpassword");

        //     // Assert
        //     Assert.True(result);
        // }

        // private void MockMySqlUser(string username, string password)
        // {
        //     // Implement the logic to mock MySQL database interactions
        // }
    }
}