using MediatR;
using Reactivities.Application.Core;
using Reactivities.Application.Interfaces;
using Reactivities.Persistence;

namespace Reactivities.Application.Users.Commands;

public class SetMainPhoto
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string PhotoId { get; set; }
    }

    public class Handler(AppDbContext dbContext, IUserAccessor userAccessor)
        : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserWithPhotosAsync();
            
            var photo = user.Photos.FirstOrDefault(x => x.Id == request.PhotoId);
            
            if (photo == null)
            {
                return Result<Unit>.Failure("No photo was found", 400);
            }

            user.ImageUrl = photo.Url;

            var result = await dbContext.SaveChangesAsync(cancellationToken) > 0;

            return result 
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Failed to set main photo", 400);
        }
    }  
}