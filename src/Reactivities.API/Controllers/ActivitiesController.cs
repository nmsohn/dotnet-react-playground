using Domain;
using Microsoft.AspNetCore.Mvc;
using Reactivities.Application.Activities.Commands;
using Reactivities.Application.Activities.Queries;

namespace Reactivities.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ActivitiesController : DefaultApiController
{
   [HttpGet]
   public async Task<ActionResult<List<Activity>>> GetActivities()
   {
      return await Mediator.Send(new GetActivityList.Query());
   }

   [HttpGet("{id}")]
   public async Task<ActionResult<Activity>> GetActivityById(string id)
   { 
      return await Mediator.Send(new GetActivityDetails.Query { Id = id });
   }
   
   [HttpPost]
   public async Task<ActionResult<string>> CreateActivity([FromBody] Activity activity)
   {
      return await Mediator.Send(new CreateActivity.Command { Activity = activity });
   }
   
   [HttpPut]
   public async Task<ActionResult> EditActivity([FromBody] Activity activity)
   {
      await Mediator.Send(new EditActivity.Command { Activity = activity });
      return NoContent();
   }
   
   [HttpDelete("{id}")]
   public async Task<ActionResult> DeleteActivity(string id)
   {
      await Mediator.Send(new DeleteActivity.Command { Id = id });
      return NoContent();
   }
}