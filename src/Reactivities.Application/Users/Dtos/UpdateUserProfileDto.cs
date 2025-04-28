namespace Reactivities.Application.Users.Dtos;

public record UpdateUserProfileDto
{
    public required string DisplayName { get; set; }
    public string? Bio { get; set; }
}