using MediatR;
using Reactivities.Application.Core;
using Reactivities.Application.Interfaces;
using Reactivities.Persistence;

namespace Reactivities.Application.Users.Commands;

public class DeletePhoto
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string PhotoId { get; set; }
    }

    public class Handler(AppDbContext dbContext, IUserAccessor userAccessor, IPhotoService photoService)
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

            if (photo.Url == user.ImageUrl)
            {
                return Result<Unit>.Failure("You cannot delete an image", 400);
            }

            await photoService.DeletePhoto(photo.PublicId);
            user.Photos.Remove(photo);
            var result = await dbContext.SaveChangesAsync(cancellationToken) > 0;

            return result 
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Failed to delete photo", 400);
        }
    }
}