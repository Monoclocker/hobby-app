using dotnetWebAPI.External;
using dotnetWebAPI.Interfaces;
using dotnetWebAPI.Models;
using dotnetWebAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace dotnetWebAPI
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddConfigurableDependencies(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(configuration["Database"]));
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ClockSkew = TimeSpan.FromSeconds(0),
                        ValidateIssuer = true,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = configuration["Issuer"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Key"]!))
                    };
                });

            return services;
        }

        public static IServiceCollection AddScopedDependencies(this IServiceCollection services)
        {
            services.AddScoped<IDbContext>(provider => provider.GetService<ApplicationDbContext>()!);
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IGroupsService, GroupsService>();
            services.AddScoped<IProfileService, ProfileService>();
            services.AddScoped<ICitiesService, CitiesService>();
           


            return services;

        }

        public static async Task AddStartConfiguration(ApplicationDbContext context)
        {
            string[] arrayOfInterest = ["Активный отдых", "Вечеринки", "Алкоголь", "Спорт", "Кофе", "Настольные игры", "Квесты", "Кино", "Книги"];
            string[] arrayOfCities = ["Ростов-на-Дону", "Москва", "string"];

            foreach (var interest in arrayOfInterest)
            {
                if (!context.Interests.Where(x => x.Name == interest).Any())
                    context.Interests.Add(new Interest() { Name = interest });
                
            }

            foreach (var city in arrayOfCities)
            {
                if (!context.Cities.Where(x => x.Name == city).Any())
                    context.Cities.Add(new City() { Name = city });
            }
            await context.SaveChangesAsync();
        }
    }
}
