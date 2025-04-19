using FluentValidation;
using Reactivities.Application.Activities.Commands;
using Reactivities.Application.Activities.dtos;

namespace Reactivities.Application.Validation;

public class CreateActivityValidator : BaseActivityValidator<CreateActivity.Command, CreateActivityDto>
{
    public CreateActivityValidator() : base(x => x.ActivityDto)
    {
        
    }
}