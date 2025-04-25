using Microsoft.AspNetCore.Mvc;
using Reactivities.Application.Users.Commands;
using Reactivities.Application.Users.Queries;
using Reactivities.Domain;

namespace Reactivities.API.Controllers;

[Route("profile")]
public class UserProfileController : DefaultApiController
{
    [HttpPost("add-photo")]
    public async Task<ActionResult<Photo>> AddPhoto([FromForm] IFormFile file)
    {
        return HandleResult(await Mediator.Send(new AddPhoto.Command { File = file }));
    }

    [HttpGet("{userId}/photos")]
    public async Task<ActionResult<List<Photo>>> GetPhotos([FromRoute] string userId)
    {
        return HandleResult(await Mediator.Send(new GetProfilePhotos.Query { UserId = userId }));
    }

    [HttpDelete("{photoId}/photos")]
    public async Task<ActionResult> DeletePhoto([FromRoute] string photoId)
    {
        return HandleResult(await Mediator.Send(new DeletePhoto.Command { PhotoId = photoId }));
    }

    [HttpPut("{photoId}/set-main")]
    public async Task<ActionResult<Photo>> SetMainPhoto([FromRoute] string photoId)
    {
       return HandleResult(await Mediator.Send(new SetMainPhoto.Command { PhotoId = photoId })); 
    }
}