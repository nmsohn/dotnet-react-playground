using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Reactivities.Application.Activities.Commands;
using Reactivities.Application.Activities.dtos;
using Reactivities.Application.Activities.Queries;
using Reactivities.Application.Core;

namespace Reactivities.API.Controllers;

public class ActivitiesController : DefaultApiController
{
    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<PagedList<ActivityDto, DateTime?>>> GetActivities(DateTime? cursor)
    {
        return HandleResult(await Mediator.Send(new GetActivityList.Query { Cursor = cursor }));
    }

    [Authorize]
    [HttpGet("{id}")]
    public async Task<ActionResult<ActivityDto>> GetActivityById(string id)
    {
        return HandleResult(await Mediator.Send(new GetActivityDetails.Query { Id = id }));
    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateActivity([FromBody] CreateActivityDto activityDto)
    {
        return HandleResult(await Mediator.Send(new CreateActivity.Command { ActivityDto = activityDto }));
    }

    [HttpPut]
    [Authorize(Policy = "IsActivityHost")]
    public async Task<ActionResult> EditActivity([FromBody] EditActivityDto activityDto)
    {
        return HandleResult(await Mediator.Send(new EditActivity.Command { ActivityDto = activityDto }));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteActivity(string id)
    {
        return HandleResult(await Mediator.Send(new DeleteActivity.Command { Id = id }));
    }

    [HttpPost("{id}/attend")]
    public async Task<ActionResult> Attend(string id)
    {
        return HandleResult(await Mediator.Send(new UpdateAttendance.Command { Id = id }));
    }
}