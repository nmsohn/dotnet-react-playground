using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Reactivities.Application.Activities.dtos;
using Reactivities.Application.Core;
using Reactivities.Application.Interfaces;
using Reactivities.Persistence;

namespace Reactivities.Application.Activities.Queries;

public class GetActivityList
{
    public class Query : IRequest<Result<PagedList<ActivityDto, DateTime?>>>
    {
        public required ActivityParams Params { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor)
        : IRequestHandler<Query, Result<PagedList<ActivityDto, DateTime?>>>
    {
        public async Task<Result<PagedList<ActivityDto, DateTime?>>> Handle(Query request,
            CancellationToken cancellationToken)
        {
            var query = context.Activities
                .OrderBy(x => x.Date)
                .Where(x => x.Date >= (request.Params.Cursor ?? request.Params.StartDate))
                .AsQueryable();

            if (!string.IsNullOrEmpty(request.Params.Filter))
            {
                query = request.Params.Filter switch
                {
                    "isGoing" => query
                        .Where(x => x.Attendees
                            .Any(a => a.UserId == userAccessor.GetUserId())),
                    "isHost" => query
                        .Where(x => x.Attendees
                            .Any(a => a.IsHost && a.UserId == userAccessor.GetUserId())),
                    _ => query
                };
            }

            var projectedActivities = query
                .ProjectTo<ActivityDto>(mapper.ConfigurationProvider, new
                {
                    currentUserId = userAccessor.GetUserId()
                });

            var activityDtos = await projectedActivities
                .Take(request.Params.PageSize + 1)
                .ToListAsync(cancellationToken);

            DateTime? nextCursor = null;
            if (activityDtos.Count() > request.Params.PageSize)
            {
                nextCursor = activityDtos.Last().Date;
                activityDtos.RemoveAt(activityDtos.Count() - 1);
            }

            return Result<PagedList<ActivityDto, DateTime?>>.Success(
                new PagedList<ActivityDto, DateTime?>
                {
                    Items = activityDtos,
                    NextCur = nextCursor
                }
            );
        }
    }
}