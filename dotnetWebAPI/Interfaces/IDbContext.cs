using dotnetWebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace dotnetWebAPI.Interfaces
{
    public interface IDbContext
    {
        public DbSet<User> Users { get; set; }

        public DbSet<Group> Groups { get; set; }

        public DbSet<Interest> Interests { get; set; }

        public DbSet<City> Cities { get; set; }

        public DbSet<SocialLink> SocialLinks { get; set; }

        public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}
