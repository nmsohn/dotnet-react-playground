using System.Text.Json;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Reactivities.Application.Core;

namespace Reactivities.API.Middleware;

public class ExceptionMiddleware(ILogger<ExceptionMiddleware> logger, IHostEnvironment env) : IMiddleware
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
        catch (Exception ex)
        {
            await HandleException(context, ex);
        }
    }

    private async Task HandleException(HttpContext context, Exception exception)
    {
        logger.LogError(exception, exception.Message);
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;

        var response = env.IsDevelopment()
            ? new AppException(StatusCodes.Status500InternalServerError, exception.Message, exception.StackTrace)
            : new AppException(StatusCodes.Status500InternalServerError, exception.Message, null);

        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
        
        var json = JsonSerializer.Serialize(response, options);
        
        await context.Response.WriteAsync(json);
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