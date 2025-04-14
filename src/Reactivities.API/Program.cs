using Microsoft.EntityFrameworkCore;
using Migrator.Setup;
using Reactivities.API.Extensions;
using Reactivities.Application.Activities.Queries;
using Reactivities.Application.Profile;
using Reactivities.Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddHttpContextAccessor();
builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseNpgsql(builder.Configuration.GetConnectionString("ActivityDatabase"))
        .EnableSensitiveDataLogging()
        .LogTo(Console.WriteLine, LogLevel.Information);
});
builder.Services.AddCors();
builder.Services.AddMediatR(x => x
    .RegisterServicesFromAssemblyContaining<GetActivityList.Handler>());
builder.Services.AddAutoMapper(typeof(ActivityProfile).Assembly);

var app = builder.Build();

await DbInitializer.InitDb(app);
app.UseCors(opt => {
    opt.AllowAnyHeader()
        .AllowAnyMethod()
        .WithOrigins("http://localhost:3000", "https://localhost:3000");
});

// Configure the HTTP request pipeline.
app.UseTimezoneMiddleware();
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
