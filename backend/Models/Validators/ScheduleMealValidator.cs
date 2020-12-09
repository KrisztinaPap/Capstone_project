using System.Collections.Generic;
using System.Linq;
using Api.Models;
using FluentValidation;

namespace Api.Models.Validators {
  public class ScheduleMealValidator : AbstractValidator<ScheduleMeal> {
    private readonly ICollection<string> _validMealTimes = new List<string>() { "lunch", "dinner", "breakfast" };

    public ScheduleMealValidator() {
      RuleFor(x => x.MealTime)
        .Must(x => _validMealTimes.Any(y => y.ToLower() == x.ToLower()))
        .WithMessage("MealTime must be 'breakfast', 'lunch' or 'dinner'");

      RuleFor(x => x.Recipes)
        .NotEmpty();
    }
  }
}
