using System.Linq;
using Api.Models;
using FluentValidation;

namespace Api.Models.Validators
{
  public class ScheduleValidator : AbstractValidator<SchedulePlan>
  {
    private readonly ScheduleMealValidator _mealValidator;

    public ScheduleValidator(ScheduleMealValidator mealValidator)
    {
      _mealValidator = mealValidator;

      RuleFor(x => x.Day)
        .NotEmpty();

      RuleForEach(x => x.Meals)
        .SetValidator(_mealValidator);
    }
  }
}
