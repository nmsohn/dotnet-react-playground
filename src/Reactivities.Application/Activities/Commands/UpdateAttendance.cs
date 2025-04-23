using MediatR;
using Microsoft.EntityFrameworkCore;
using Reactivities.Application.Core;
using Reactivities.Application.Interfaces;
using Reactivities.Domain;
using Reactivities.Persistence;

namespace Reactivities.Application.Activities.Commands;

public class UpdateAttendance
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string Id { get; set; }
    }

    public class Handler(IUserAccessor userAccessor, AppDbContext dbContext) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await dbContext.Activities
                .Include(x => x.Attendees)
                .ThenInclude(x => x.User)
                .SingleOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
            if (activity == null)
            {
                return Result<Unit>.Failure("Activity not found", 404);
            }

            var user = await userAccessor.GetUserAsync();
            
            var attendance = activity.Attendees.FirstOrDefault(x => x.UserId == user.Id);
            
            var isHost = activity.Attendees.Any(x => x.IsHost && x.UserId == user.Id);
            
            if (attendance != null)
            {
                if (isHost) activity.IsCancelled = !activity.IsCancelled;
                else activity.Attendees.Remove(attendance);
            }
            else
            {
                activity.Attendees.Add(new ActivityAttendee
                {
                    UserId = user.Id,
                    ActivityId = activity.Id,
                    IsHost = isHost,
                });
            }
            
            var result = await dbContext.SaveChangesAsync(cancellationToken) > 0;
            
            return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem saving attendance", 500);
        }
    }
}