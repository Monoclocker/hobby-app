using dotnetWebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace dotnetWebAPI.Interfaces
{
    public interface IDbContext
    {
        public DbSet<User> Users { get; set; }

        public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);

    }
}
