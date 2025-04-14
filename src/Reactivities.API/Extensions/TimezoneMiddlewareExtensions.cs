using Reactivities.API.Middleware;

namespace Reactivities.API.Extensions;

public static class TimezoneMiddlewareExtensions
{
    public static IApplicationBuilder UseTimezoneMiddleware(
        this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<TimezoneMiddleware>();
    }
}
