using FluentValidation;
using Reactivities.Application.Activities.Commands;
using Reactivities.Application.Activities.dtos;

namespace Reactivities.Application.Validation;

public class EditActivityValidator : BaseActivityValidator<EditActivity.Command, EditActivityDto>
{
    public EditActivityValidator() : base(x => x.ActivityDto)
    {
        RuleFor(x => x.ActivityDto.Id)
            .NotEmpty().WithMessage("Id is required.");
    }
}