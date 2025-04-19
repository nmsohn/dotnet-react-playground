using FluentValidation;
using MediatR;

namespace Reactivities.Application.Validation;

public class ValidationBehaviour<TRequest, TResponse>(IValidator<TRequest>? validator = null)
: IPipelineBehavior<TRequest, TResponse> where TRequest : notnull
{
    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        if (validator == null) return await next();
        var result = await validator.ValidateAsync(request, cancellationToken);

        if (!result.IsValid)
        {
            throw new ValidationException(result.Errors);
        }

        return await next();
    }
}