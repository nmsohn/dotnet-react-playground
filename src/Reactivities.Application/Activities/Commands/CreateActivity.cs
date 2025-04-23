using AutoMapper;
using MediatR;
using Reactivities.Application.Activities.dtos;
using Reactivities.Application.Core;
using Reactivities.Application.Interfaces;
using Reactivities.Domain;
using Reactivities.Persistence;

namespace Reactivities.Application.Activities.Commands;

public class CreateActivity
{
    public class Command: IRequest<Result<string>>
    {
        public required CreateActivityDto ActivityDto { get; init; }
    }

    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserAsync();
            
            var activity = mapper.Map<Activity>(request.ActivityDto);
            context.Activities.Add(activity); //AddAsync() is not used here. Only to allow special values generator to be used
            
            var attendee = new ActivityAttendee
            {
                UserId = user.Id,
                ActivityId = activity.Id,
                IsHost = true
            };
            
            activity.Attendees.Add(attendee);
            
            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            
            if (!result) return Result<string>.Failure("Failed to create activity", 400);
            
            return Result<string>.Success(activity.Id);
        }
    }
}