namespace JobBot_IDP.Services
{
    public interface IUserService
    {
        bool ValidateUser(string username, string password);
        Task<bool> RegisterUser(Models.User user);
        Task<bool> VerifySession(string token);
    }
}