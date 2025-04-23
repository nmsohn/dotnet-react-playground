using Reactivities.Domain;

namespace Reactivities.Application.Interfaces;

public interface IUserAccessor
{
    string GetUserId();
    Task<User> GetUserAsync();
}