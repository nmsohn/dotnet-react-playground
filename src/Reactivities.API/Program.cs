using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Migrator.Setup;
using Reactivities.API.Extensions;
using Reactivities.API.Middleware;
using Reactivities.Application.Activities.Queries;
using Reactivities.Application.Profile;
using Reactivities.Application.Validation;
using Reactivities.Persistence;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddHttpContextAccessor();
builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseNpgsql(builder.Configuration.GetConnectionString("ActivityDatabase"))
        .EnableSensitiveDataLogging()
        .LogTo(Console.WriteLine, LogLevel.Information);
});
builder.Services.AddCors();
builder.Services.AddMediatR(x =>
{
    x.RegisterServicesFromAssemblyContaining<GetActivityList.Handler>();
    x.AddOpenBehavior(typeof(ValidationBehaviour<,>));
});
builder.Services.AddAutoMapper(typeof(ActivityProfile).Assembly);
builder.Services.AddValidatorsFromAssemblyContaining<CreateActivityValidator>();
builder.Services.AddTransient<ExceptionMiddleware>();

var app = builder.Build();

await DbInitializer.InitDb(app);

app.UseMiddleware<ExceptionMiddleware>();
app.UseTimezoneMiddleware();

app.UseCors(opt =>
{
    opt.AllowAnyHeader()
        .AllowAnyMethod()
        .WithOrigins("http://localhost:3000", "https://localhost:3000");
});

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();