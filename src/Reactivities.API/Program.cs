using Microsoft.EntityFrameworkCore;
using Migrator.Setup;
using Reactivities.Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseNpgsql(builder.Configuration.GetConnectionString("ActivityDatabase"))
        .EnableSensitiveDataLogging()
        .LogTo(Console.WriteLine, LogLevel.Information);
});

var app = builder.Build();

await DbInitializer.InitDb(app);

app.MapControllers();

app.Run();
