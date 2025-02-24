using TimeZoneConverter;

namespace Reactivities.Application.Converter;

public class DateTimeConverter : IDateTimeConverter
{
    public DateTime ToLocal(DateTime utc, string timezone)
    {
        return TimeZoneInfo.ConvertTimeFromUtc(utc,
            TimeZoneInfo.FindSystemTimeZoneById(TZConvert.IanaToWindows(timezone)));
    }

    public DateTime ToUtc(DateTime local, string timezone)
    {
        if (local.Kind == DateTimeKind.Utc)
        {
            throw new InvalidOperationException($"{local.Kind} is invalid.");
        }
        
        local = DateTime.SpecifyKind(local, DateTimeKind.Unspecified);
        TimeZoneInfo ut = TimeZoneInfo.FindSystemTimeZoneById(TZConvert.IanaToWindows(timezone));
        return TimeZoneInfo.ConvertTimeToUtc(local, ut);
    }
}