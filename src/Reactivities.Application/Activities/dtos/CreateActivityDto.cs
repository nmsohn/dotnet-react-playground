using System.ComponentModel.DataAnnotations;

namespace Reactivities.Application.Activities.dtos;

public record CreateActivityDto
{
    public string Title { get; init; } = string.Empty;
    public DateTime Date { get; init; }
    public string Description { get; init; } = string.Empty;
    public string Category { get; init; } = string.Empty;
    public bool IsCancelled { get; init; }
    public string City { get; init; } = string.Empty;
    public string Venue { get; init; } = string.Empty;
    public double Latitude { get; init; }
    public double Longitude { get; init; } 
}