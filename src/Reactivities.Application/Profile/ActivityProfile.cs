using Domain;

namespace Reactivities.Application.Profile;

public class ActivityProfile : AutoMapper.Profile
{
    public ActivityProfile()
    {
        CreateMap<Activity, Activity>();
    }
    
}