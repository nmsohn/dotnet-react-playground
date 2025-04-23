using Reactivities.Application.Users.Dtos;

namespace Reactivities.Application.Activities.dtos;

public record ActivityDto : BaseActivityDto
{
    public required string Id { get; set; }
    public ICollection<UserProfileDto> Attendees { get; init; } = new List<UserProfileDto>();
    public required string HostDisplayName { get; init; }
    public required string HostId { get; init; }
}