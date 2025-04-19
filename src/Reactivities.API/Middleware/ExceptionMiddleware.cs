using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace Reactivities.API.Middleware;

public class ExceptionMiddleware : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (ValidationException ex)
        {
            await HandleValidationException(context, ex);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    private static async Task HandleValidationException(HttpContext context, ValidationException validationException)
    {
        var validationErrors = new Dictionary<string, string[]>();

        if (validationException.Errors != null)
        {
            foreach (var error in validationException.Errors)
            {
                if (validationErrors.TryGetValue(error.PropertyName, out var existingErrors))
                {
                    validationErrors[error.PropertyName] = existingErrors.Append(error.ErrorMessage).ToArray();
                }
                else
                {
                    validationErrors[error.PropertyName] = [error.ErrorMessage];
                }
            }
        }

        context.Response.StatusCode = StatusCodes.Status400BadRequest;
        
        var validationProblemDetails = new ValidationProblemDetails
        {
            Status = context.Response.StatusCode,
            Type = "ValidationFailure",
            Title = "Validation Error",
            Detail = "One or more validation errors occurred.",
            Instance = context.Request.Path,
            Errors = validationErrors
        };

        await context.Response.WriteAsJsonAsync(validationProblemDetails);
    }
}