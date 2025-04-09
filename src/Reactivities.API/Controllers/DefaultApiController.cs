using MediatR;
using Microsoft.AspNetCore.Mvc;
using Reactivities.Persistence;

namespace Reactivities.API.Controllers;

[ApiController]
public class DefaultApiController : ControllerBase
{
    //Lazy Initialization:
    //The IMediator instance is only created when it is first accessed,
    //which can improve performance if the mediator is not always needed
    
    //the mediator is only retrieved from the dependency injection container the first time it's needed,
    //rather than at controller construction time
    
    // private readonly Lazy<IMediator> _lazyMediator;
    // public DefaultApiController()
    // {
    //     _lazyMediator = new Lazy<IMediator>(() =>
    //         HttpContext.RequestServices.GetService<IMediator>()
    //         ?? throw new InvalidOperationException("IMediator not found in request services"));
    // }
    //
    // protected IMediator Mediator => _lazyMediator.Value;
    
    
    // private Lazy<string> _someVariable = new Lazy<string>(SomeClass.IOnlyWantToCallYouOnce);
    //
    // public string SomeVariable => _someVariable.Value;
    
    // Operator ??= is available using C# 8.0 and later, so you can now do it even more concise:
    // it's not thread-safe
    // doesn't suit for properties of non-nullable types like struct or value
    private IMediator? _mediator;
    protected IMediator Mediator => 
        _mediator ??= HttpContext.RequestServices.GetService<IMediator>() 
                      ?? throw new InvalidOperationException("IMediator not found in request services");
}