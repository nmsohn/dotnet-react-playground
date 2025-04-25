using Reactivities.Application.Activities.dtos;
using Reactivities.Application.Converter;
using Reactivities.Application.Users.Dtos;
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

        CreateMap<Activity, ActivityDto>()
            .ForMember(dest => dest.HostDisplayName,
                opt => opt.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost)!.User.DisplayName))
            .ForMember(dest => dest.HostId, opt => opt.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost)!.User.Id));

        CreateMap<ActivityAttendee, UserProfileDto>()
            .ForMember(dest => dest.DisplayName, opt => opt.MapFrom(s => s.User.DisplayName))
            .ForMember(dest => dest.Bio, opt => opt.MapFrom(s => s.User.Bio))
            .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(s => s.User.ImageUrl))
            .ForMember(dest => dest.Id, opt => opt.MapFrom(s => s.User.Id));
    }
}