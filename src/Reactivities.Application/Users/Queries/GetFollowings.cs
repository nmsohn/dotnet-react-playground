using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Reactivities.Application.Core;
using Reactivities.Application.Interfaces;
using Reactivities.Application.Users.Dtos;
using Reactivities.Persistence;

namespace Reactivities.Application.Users.Queries;

public class GetFollowings
{
    public class Query : IRequest<Result<List<UserProfileDto>>>
    {
        public string Predicate { get; set; } = "followers";
        public required string UserId { get; set; }
    }

    public class Handler(AppDbContext dbContext, IMapper mapper, IUserAccessor userAccessor)
        : IRequestHandler<Query, Result<List<UserProfileDto>>>
    {
        public async Task<Result<List<UserProfileDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var profiles = new List<UserProfileDto>();

            switch (request.Predicate)
            {
                case "followers":
                    profiles = await dbContext.UserFollowings
                        .Where(x => x.TargetId == request.UserId)
                        .Select(x => x.Observer)
                        .ProjectTo<UserProfileDto>(mapper.ConfigurationProvider, new { currentUserId = userAccessor.GetUserId() })
                        .ToListAsync(cancellationToken);
                    break;
                case "followings":
                    profiles = await dbContext.UserFollowings
                        .Where(x => x.ObserverId== request.UserId)
                        .Select(x => x.Target)
                        .ProjectTo<UserProfileDto>(mapper.ConfigurationProvider, new { currentUserId = userAccessor.GetUserId() })
                        .ToListAsync(cancellationToken);
                    break;
                default:
                    break;
            }
            
            return Result<List<UserProfileDto>>.Success(profiles);
        }
    }
}