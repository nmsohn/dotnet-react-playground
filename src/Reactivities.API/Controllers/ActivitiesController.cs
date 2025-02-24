using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Reactivities.Persistence;

namespace Reactivities.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ActivitiesController(AppDbContext dbContext) : DefaultApiController
{
   [HttpGet]
   public async Task<ActionResult<List<Activity>>> GetActivities()
   {
      return await dbContext.Activities.ToListAsync();
   }

   [HttpGet("{id}")]
   public async Task<ActionResult<Activity>> GetActivityById(string id)
   {
      var activity = await dbContext.Activities.FindAsync(id);
      if (activity == null)
      {
         return NotFound($"Activity not found");
      }

      return activity;

   }
}