using Domain;
using Reactivities.Application.Converter;

namespace Reactivities.Application.Profile;

public class ActivityProfile : AutoMapper.Profile
{
    public ActivityProfile()
    {
        CreateMap<Activity, Activity>()
            .ForMember(dest => dest.Date, opt => opt.MapFrom<TimeZoneResolver, DateTime>(s => s.Date));
    }
}