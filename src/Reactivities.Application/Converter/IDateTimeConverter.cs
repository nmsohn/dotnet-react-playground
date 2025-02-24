namespace Reactivities.Application.Converter;

public interface IDateTimeConverter
{
    DateTime ToLocal(DateTime utc, string timezone);
    DateTime ToUtc(DateTime local, string timezone);
}