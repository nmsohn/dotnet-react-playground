using FluentValidation;
using Reactivities.Application.Users.Commands;

namespace Reactivities.Application.Validation;

public class EditProfileValidator : AbstractValidator<UpdateProfile.Command>
{
    public EditProfileValidator()
    {
        RuleFor(x => x.UserProfileDto.DisplayName)
            .NotEmpty();
    } 
}