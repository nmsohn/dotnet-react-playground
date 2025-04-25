namespace Reactivities.Application.Users.Dtos;

public record PhotoUploadResult
{
    public required string PublicId { get; set; }
    public required string Url { get; set; }
}