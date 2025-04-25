using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Reactivities.Application.Core;
using Reactivities.Application.Users.Dtos;
using Reactivities.Persistence;

namespace Reactivities.Application.Users.Queries;

public class GetProfile
{
    public class Query : IRequest<Result<UserProfileDto>>
    {
        public required string UserId { get; set; }
    }

    public class Handler(AppDbContext dbContext, IMapper mapper) 
        : IRequestHandler<Query, Result<UserProfileDto>>
    {
        public async Task<Result<UserProfileDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var profile = await dbContext.Users
                .ProjectTo<UserProfileDto>(mapper.ConfigurationProvider)
                .SingleOrDefaultAsync(x => x.Id == request.UserId, cancellationToken: cancellationToken);

            return profile == null
                ? Result<UserProfileDto>.Failure("User not found", 404)
                : Result<UserProfileDto>.Success(profile);
        }
    }
}