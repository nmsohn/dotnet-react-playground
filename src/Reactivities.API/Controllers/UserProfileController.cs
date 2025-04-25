using Microsoft.AspNetCore.Mvc;
using Reactivities.Application.Users.Commands;
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
}