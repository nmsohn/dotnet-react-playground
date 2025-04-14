using TimeZoneConverter;

namespace Reactivities.API.Middleware;

public class TimezoneMiddleware
{
    private readonly RequestDelegate _next;
    private const string DefaultTimezone = "UTC";
    private const string TimezoneHeader = "X-Timezone";

    public TimezoneMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var timezone = context.Request.Headers[TimezoneHeader].FirstOrDefault() ?? DefaultTimezone;
        
        try
        {
            // Validate timezone
            var windowsTimezone = TZConvert.IanaToWindows(timezone);
            TimeZoneInfo.FindSystemTimeZoneById(windowsTimezone);
            
            // Store timezone in HttpContext.Items for use in converters/handlers
            context.Items["timezone"] = timezone;
        }
        catch (Exception)
        {
            context.Items["timezone"] = DefaultTimezone;
        }

        await _next(context);
    }
}
