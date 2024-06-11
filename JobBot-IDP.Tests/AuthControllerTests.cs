using System.Threading.Tasks;
using JobBot_IDP.Controllers;
using JobBot_IDP.Models;
using JobBot_IDP.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Moq;
using Xunit;

namespace JobBot.Tests
{
    public class AuthControllerTests
    {
        private readonly Mock<IUserService> _userServiceMock;
        private readonly Mock<IConfiguration> _configurationMock;
        private readonly AuthController _authController;

        public AuthControllerTests()
        {
            _userServiceMock = new Mock<IUserService>();
            _configurationMock = new Mock<IConfiguration>();
            _authController = new AuthController(_userServiceMock.Object, _configurationMock.Object);
        }

        [Fact]
        public async Task Register_ShouldReturnOkResult_WhenRegistrationIsSuccessful()
        {
            // Arrange
            var user = new User { Username = "test", Email = "test@example.com", Password = "password" };
            _userServiceMock.Setup(u => u.RegisterUser(user)).ReturnsAsync(true);

            // Act
            var result = await _authController.Register(user);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal("success", ((dynamic)okResult.Value).status);
        }

        [Fact]
        public void Login_ShouldReturnOkResult_WhenCredentialsAreValid()
        {
            // Arrange
            var user = new User { Username = "testuser", Password = "password" };
            _userServiceMock.Setup(u => u.ValidateUser(user.Username, user.Password)).Returns(true);

            // Act
            var result = _authController.Login(user);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal("success", ((dynamic)okResult.Value).status);
        }

        [Fact]
        public async Task VerifySession_ShouldReturnOkResult_WhenTokenIsValid()
        {
            // Arrange
            var token = "valid_token";
            _userServiceMock.Setup(u => u.VerifySession(token)).ReturnsAsync(true);

            // Act
            var result = await _authController.VerifySession(token);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal("success", ((dynamic)okResult.Value).status);
        }
    }
}