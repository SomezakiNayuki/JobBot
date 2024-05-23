using Microsoft.EntityFrameworkCore;
using JobBot_IDP.Models;

namespace JobBot_IDP.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; } = null!; // Initialized in declaration

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    }
}