using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Reactivities.Persistence.Configuration;

public class ActivityConfiguration : IEntityTypeConfiguration<Activity>
{
    public void Configure(EntityTypeBuilder<Activity> builder)
    {
        builder.ToTable("Activities");
        // builder.Property(p => p.Date)
        //     .HasConversion(v => v, v => DateTime.SpecifyKind(v, DateTimeKind.Utc))
        //     .HasColumnType("Date");
    }
}