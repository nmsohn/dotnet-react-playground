namespace Reactivities.Application.Users.Dtos;

public record UserActivityDto
{
    public required string Id { get; set; }
    public required string Title { get; set; }
    public required string Category { get; set; }
    public DateTime Date { get; set; }
}