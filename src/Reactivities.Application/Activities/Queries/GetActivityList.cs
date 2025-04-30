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
    private const int MaxPageSize = 50;

    public class Query : IRequest<Result<PagedList<ActivityDto, DateTime?>>>
    {
        public DateTime? Cursor { get; set; }
        private int _pageSize = 3;

        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }
    }

    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor)
        : IRequestHandler<Query, Result<PagedList<ActivityDto, DateTime?>>>
    {
        public async Task<Result<PagedList<ActivityDto, DateTime?>>> Handle(Query request,
            CancellationToken cancellationToken)
        {
            var query = context.Activities
                .OrderBy(x => x.Date)
                .AsQueryable();

            if (request.Cursor.HasValue)
            {
                query = query.Where(x => x.Date >= request.Cursor.Value);
            }

            var activityDtos = await query
                .Take(request.PageSize + 1)
                .ProjectTo<ActivityDto>(mapper.ConfigurationProvider, new
                {
                    currentUserId = userAccessor.GetUserId()
                })
                .ToListAsync(cancellationToken);

            DateTime? nextCursor = null;
            if (activityDtos.Count() > request.PageSize)
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