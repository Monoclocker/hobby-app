using dotnetWebAPI.Interfaces;
using dotnetWebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace dotnetWebAPI.External
{
    public class ApplicationDbContext: DbContext, IDbContext
    {
        public DbSet<User> Users { get; set; } = default!;

        public DbSet<Group> Groups { get; set; } = default!;

        public DbSet<Interest> Interests { get; set; } = default!;

        public DbSet<City> Cities { get; set; } = default!;

        public DbSet<SocialLink> SocialLinks { get; set; } = default!;

        public ApplicationDbContext(DbContextOptions options): base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Age).IsRequired();
                entity.HasKey(e => e.Id);
                entity.HasAlternateKey(e => e.Username);

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

                entity
                .HasOne(e => e.City)
                .WithMany(e => e.Profiles);

                entity
                .HasMany(e => e.Interests)
                .WithMany(e => e.Profiles);

            });

            modelBuilder.Entity<Group>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity
                .HasMany(e => e.GroupUsers)
                .WithMany(e => e.Groups)
                .UsingEntity<GroupsUsers>(
                opt =>
                    opt.HasOne(p => p.User)
                    .WithMany(p => p.GroupsUsers)
                    .HasForeignKey(p=>p.UserId),
                opt =>
                    opt.HasOne(p=>p.Group)
                    .WithMany(p=>p.GroupsUsers)
                    .HasForeignKey(p=>p.GroupId),
                opt =>
                {
                    opt.Property(p => p.IsAdmin).HasDefaultValue(false);
                });
            });

            modelBuilder.Entity<City>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Name).IsRequired();
            });

            modelBuilder.Entity<Interest>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired();
            });
        }
    }
}
