using Reactivities.Application.Activities.dtos;
using Reactivities.Application.Converter;
using Reactivities.Domain;

namespace Reactivities.Application.Profile;

public class ActivityProfile : AutoMapper.Profile
{
    public ActivityProfile()
    {
        CreateMap<Activity, Activity>()
            .ForMember(dest => dest.Date, opt => opt.MapFrom<TimeZoneResolver, DateTime>(s => s.Date));
        
        CreateMap<CreateActivityDto, Activity>()
            .ForMember(dest => dest.Date, opt => opt.MapFrom<TimeZoneResolver, DateTime>(s => s.Date));
    }
}