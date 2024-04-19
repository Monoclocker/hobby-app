using dotnetWebAPI.Interfaces;
using dotnetWebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace dotnetWebAPI.External
{
    public class ApplicationDbContext: DbContext, IDbContext
    {
        public DbSet<User> Users { get; set; } = default!;

        public ApplicationDbContext(DbContextOptions options): base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.HasIndex(e => e.Username);

                entity.HasIndex(e => e.Email);

                entity.Property(e => e.Username)
                .HasMaxLength(64)
                .IsRequired();

                entity.Property(e => e.Password)
                .HasMaxLength(64)
                .IsRequired();

                entity.Property(e => e.Email)
                .IsRequired();

                entity.Property(e => e.IsBlocked)
                .HasDefaultValue(false);

                entity.Property(e => e.IsEmailConfirmed)
                .HasDefaultValue(false);

                entity.Property(e => e.SecurityTimeStamp)
                .HasDefaultValue(DateTime.UtcNow);
            });

        }

        


    }
}
