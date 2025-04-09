using Domain;
using MediatR;
using Reactivities.Persistence;

namespace Reactivities.Application.Activities.Commands;

public class CreateActivity
{
    public class Command: IRequest<string>
    {
        public required Activity Activity { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, string>
    {
        public async Task<string> Handle(Command request, CancellationToken cancellationToken)
        {
            context.Activities.Add(request.Activity); //AddAsync() is not used here. Only to allow special values generator to be used
            await context.SaveChangesAsync(cancellationToken);
            return request.Activity.Id;
        }
    }
}