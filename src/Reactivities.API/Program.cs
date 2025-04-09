using Microsoft.EntityFrameworkCore;
using Migrator.Setup;
using Reactivities.Application.Activities.Queries;
using Reactivities.Application.Converter;
using Reactivities.Application.Profile;
using Reactivities.Persistence;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseNpgsql(builder.Configuration.GetConnectionString("ActivityDatabase"))
        .EnableSensitiveDataLogging()
        .LogTo(Console.WriteLine, LogLevel.Information);
});
builder.Services.AddCors();
builder.Services.AddMediatR(x => x
    .RegisterServicesFromAssemblyContaining<GetActivityList.Handler>());
builder.Services.AddScoped<IDateTimeConverter, DateTimeConverter>();
builder.Services.AddAutoMapper(typeof(ActivityProfile).Assembly);

var app = builder.Build();

await DbInitializer.InitDb(app);
app.UseCors(opt => {
    opt.AllowAnyHeader()
    .AllowAnyMethod()
    .WithOrigins("http://localhost:3000", "https://localhost:3000");
});

app.MapControllers();

app.Run();
