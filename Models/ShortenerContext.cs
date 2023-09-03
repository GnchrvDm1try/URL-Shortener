using Microsoft.EntityFrameworkCore;

namespace Shortener.Models
{
    public class ShortenerContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public ShortenerContext(DbContextOptions<ShortenerContext> options, IConfiguration configuration) : base(options)
        {
            _configuration = configuration;
        }

        public ShortenerContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public DbSet<User> Users { get; set; }
        public DbSet<URL> URLs { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql(_configuration.GetConnectionString("defaultConnection")!);
            }
        }
    }
}
