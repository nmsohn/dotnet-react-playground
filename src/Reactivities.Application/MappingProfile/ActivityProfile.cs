using Reactivities.Application.Activities.dtos;
using Reactivities.Application.Converter;
using Reactivities.Application.Users.Dtos;
using Reactivities.Domain;

namespace Reactivities.Application.MappingProfile;

public class ActivityProfile : AutoMapper.Profile
{
    public ActivityProfile()
    {
        string? currentUserId = null;
        CreateMap<Activity, Activity>()
            .ForMember(dest => dest.Date, opt => opt.MapFrom<TimeZoneResolver, DateTime>(s => s.Date));

        CreateMap<CreateActivityDto, Activity>()
            .ForMember(dest => dest.Date, opt => opt.MapFrom<TimeZoneResolver, DateTime>(s => s.Date));

        CreateMap<Activity, ActivityDto>()
            .ForMember(dest => dest.HostDisplayName,
                opt => opt.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost)!.User.DisplayName))
            .ForMember(dest => dest.HostId,
                opt => opt.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost)!.User.Id));

        CreateMap<ActivityAttendee, UserProfileDto>()
            .ForMember(dest => dest.DisplayName, opt => opt.MapFrom(s => s.User.DisplayName))
            .ForMember(dest => dest.Bio, opt => opt.MapFrom(s => s.User.Bio))
            .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(s => s.User.ImageUrl))
            .ForMember(dest => dest.Id, opt => opt.MapFrom(s => s.User.Id))
            .ForMember(dest => dest.FollowersCount, opt => opt.MapFrom(s => s.User.Followers.Count))
            .ForMember(dest => dest.FollowingsCount, opt => opt.MapFrom(s => s.User.Followings.Count))
            .ForMember(dest => dest.Following,
                opt => opt.MapFrom(s => s.User.Followers.Any(x => x.ObserverId == currentUserId)));

        CreateMap<User, UserProfileDto>()
            .ForMember(dest => dest.FollowersCount, opt => opt.MapFrom(s => s.Followers.Count))
            .ForMember(dest => dest.FollowingsCount, opt => opt.MapFrom(s => s.Followings.Count))
            .ForMember(dest => dest.Following, opt => opt.MapFrom(s => s.Followers.Any(x => x.ObserverId == currentUserId)));

        CreateMap<Comment, CommentDto>()
            .ForMember(dest => dest.DisplayName, opt => opt.MapFrom(s => s.User!.DisplayName))
            .ForMember(dest => dest.UserId, opt => opt.MapFrom(s => s.User!.Id))
            .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(s => s.User!.ImageUrl));

        CreateMap<Activity, UserActivityDto>();
    }
}