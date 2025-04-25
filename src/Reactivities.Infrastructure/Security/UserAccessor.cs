using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Reactivities.Application.Interfaces;
using Reactivities.Domain;
using Reactivities.Persistence;

namespace Reactivities.Infrastructure.Security;

public class UserAccessor(IHttpContextAccessor httpContextAccessor, AppDbContext dbContext) : IUserAccessor
{
    public string GetUserId()
    {
        return httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier) ?? throw new Exception("No user found");
    }

    public async Task<User> GetUserAsync()
    {
        return await dbContext.Users.FindAsync(GetUserId()) ?? throw new Exception("No user found");
    }

    public async Task<User> GetUserWithPhotosAsync()
    {
        var userId = GetUserId();
        
        return await dbContext.Users
            .Include(x => x.Photos)
            .FirstOrDefaultAsync(x => x.Id == userId) ?? throw new Exception("No user found"); 
    }
}