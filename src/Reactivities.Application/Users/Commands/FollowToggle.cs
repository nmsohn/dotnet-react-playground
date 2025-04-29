using MediatR;
using Reactivities.Application.Core;
using Reactivities.Application.Interfaces;
using Reactivities.Domain;
using Reactivities.Persistence;

namespace Reactivities.Application.Users.Commands;

public class FollowToggle
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string TargetId { get; set; }
    }

    public class Handler(AppDbContext dbContext, IUserAccessor userAccessor)
        : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var observer = await userAccessor.GetUserAsync();
            var target = await dbContext.Users.FindAsync([request.TargetId], cancellationToken);

            if (target == null)
            {
                return Result<Unit>.Failure("Target user not found", 404);
            }

            var following = await dbContext.UserFollowings.FindAsync([observer.Id, target.Id], cancellationToken);

            if (following == null)
            {
                dbContext.UserFollowings.Add(new UserFollowing
                {
                    ObserverId = observer.Id,
                    TargetId = target.Id,
                });
            }
            else
            {
                dbContext.UserFollowings.Remove(following);
            }
           
            return await dbContext.SaveChangesAsync(cancellationToken) > 0
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Failed to save changes", 400);
        }
    }
}