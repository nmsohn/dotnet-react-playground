using Domain;
using Microsoft.EntityFrameworkCore;

namespace Reactivities.Persistence;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<Activity> Activities { get; set; }
}