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
            services.AddScoped<IPlacesService, PlacesService>();
           


            return services;

        }

        public static async Task AddStartConfiguration(ApplicationDbContext context)
        {
            string[] arrayOfInterest = ["Активный отдых", "Вечеринки", "Алкоголь", "Спорт", "Кофе", "Настольные игры", "Квесты", "Кино", "Книги"];
            string[] arrayOfCities = ["Ростов-на-Дону", "Москва", "string"];

            string places = 
                "Бар Три тонны; 39.729395 47.223761" +
                "\r\nПинта на улице Варфоломеева;39.714671 47.233032" +
                "\r\nКосмические ежи;39.713153 47.220156" +
                "\r\nБаварский ресторан Августин;39.71795 47.221723" +
                "\r\nпинта на Ворошиловском проспекте;39.714671 47.232958" +
                "\r\nБар Паб-15;39.715543 47.233778" +
                "\r\nГриль паб «Бекон & John»;39.716199 47.28694" +
                "\r\nAbbey Road на Пушкинской улице;30.298782 59.451419" +
                "\r\nБир Хоф на Темерницкой улице;39.718885 47.21996" +
                "\r\nКараоке Ля Мажор;39.704673 47.224936" +
                "\r\nПинта на Будённовском проспекте;39.701817 47.234414" +
                "\r\nПинта на проспекте Космонавтов;39.717555 47.281219" +
                "\r\nСпорт-бар Добрый Эль в ТЦ Форум;39.717187 47.284073" +
                "\r\nDrunken winnie american bar & burgers;39.715606 47.222757" +
                "\r\nCork;39.700227 47.233344" +
                "\r\n Бар-бильярдная Дублин;39.718849 47.223479" +
                "\r\nЛегенда на проспекте Соколова;39.696436 47.251384" +
                "\r\nЁлка на Большой Садовой улице;39.72246 47.221282" +
                "\r\nАссамблея на улице Нариманова;39.710638 47.221558\r\n";

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
