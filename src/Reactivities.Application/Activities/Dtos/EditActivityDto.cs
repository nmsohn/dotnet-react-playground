namespace Reactivities.Application.Activities.dtos;

public record EditActivityDto : BaseActivityDto
{
    public string Id { get; set; } = string.Empty;
}