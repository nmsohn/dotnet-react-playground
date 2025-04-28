using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Reactivities.Application.Core;
using Reactivities.Application.Interfaces;
using Reactivities.Application.Users.Dtos;
using Reactivities.Persistence;

namespace Reactivities.Application.Users.Commands;

public class UpdateProfile
{
    public class Command : IRequest<Result<Unit>>
    {
        public UpdateUserProfileDto UserProfileDto { get; set; }
    }

    public class Handler(AppDbContext dbContext, IUserAccessor userAccessor, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserAsync();
            
            user.Bio = request.UserProfileDto.Bio;
            user.DisplayName = request.UserProfileDto.DisplayName;
            
            dbContext.Entry(user).State = EntityState.Modified;
            
            var result = await dbContext.SaveChangesAsync(cancellationToken) > 0;
            
            return result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Failed to update profile", 400);
        }
    }
}