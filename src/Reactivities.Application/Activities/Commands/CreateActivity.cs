using AutoMapper;
using Domain;
using MediatR;
using Reactivities.Application.Activities.dtos;
using Reactivities.Persistence;

namespace Reactivities.Application.Activities.Commands;

public class CreateActivity
{
    public class Command: IRequest<string>
    {
        public required CreateActivityDto ActivityDto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, string>
    {
        public async Task<string> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = mapper.Map<Activity>(request.ActivityDto);
            context.Activities.Add(activity); //AddAsync() is not used here. Only to allow special values generator to be used
            await context.SaveChangesAsync(cancellationToken);
            return activity.Id;
        }
    }
}