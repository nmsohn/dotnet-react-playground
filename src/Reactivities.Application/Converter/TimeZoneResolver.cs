using AutoMapper;
using Microsoft.AspNetCore.Http;
using TimeZoneConverter;

namespace Reactivities.Application.Converter;

public class TimeZoneResolver : IMemberValueResolver<object, object, DateTime, DateTime>
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public TimeZoneResolver(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    private DateTime ToLocal(DateTime utc, string timezone)
    {
        return TimeZoneInfo.ConvertTimeFromUtc(utc,
            TimeZoneInfo.FindSystemTimeZoneById(TZConvert.IanaToWindows(timezone)));
    }

    private DateTime ToUtc(DateTime local, string timezone)
    {
        if (local.Kind == DateTimeKind.Utc)
        {
            throw new InvalidOperationException($"{local.Kind} is invalid.");
        }
        
        // local = DateTime.SpecifyKind(local, DateTimeKind.Unspecified);
        TimeZoneInfo ut = TimeZoneInfo.FindSystemTimeZoneById(TZConvert.IanaToWindows(timezone));
        return TimeZoneInfo.ConvertTimeToUtc(local, ut);
    }

    public DateTime Resolve(object source, object destination, DateTime sourceMember, DateTime destMember,
        ResolutionContext context)
    {
        var timezone = _httpContextAccessor.HttpContext?.Items["timezone"] as string ?? "UTC";
        if (sourceMember.Kind == DateTimeKind.Utc)
        {
            return ToLocal(sourceMember, timezone);
        }

        return ToUtc(sourceMember, timezone);
    }
}
