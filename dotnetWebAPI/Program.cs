
using dotnetWebAPI.External;

namespace dotnetWebAPI
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
                

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddConfigurableDependencies(builder.Configuration);
            builder.Services.AddScopedDependencies();
            builder.Logging.AddConsole();


            var app = builder.Build();

            app.UseSwagger();
            app.UseSwaggerUI();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                
            }

            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var context = services.GetRequiredService<ApplicationDbContext>();
                context.Database.EnsureCreated();
                await DependencyInjection.AddStartConfiguration(context);
            }

            app.UseHttpsRedirection();

            app.UseCors(options => {
                options.AllowAnyHeader();
                options.AllowAnyMethod();
                options.AllowAnyOrigin();
            });

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseDeveloperExceptionPage();
            app.MapControllers();

            app.Run();
        }
    }
}
