using FluentValidation;

namespace Api.Models.Validators {

   public class IngredientValidator : AbstractValidator<Ingredient> {

    public IngredientValidator() {
      RuleSet("Create", () => {
        RuleFor(x => x.Id)
          .Empty()
          .WithMessage("Cannot set ingredient id on creation");

        RuleFor(x => x.UOMId)
          .NotEmpty()
          .WithMessage("UOM must be Selected");

        RuleFor(x => x.Name)
          .NotEmpty()
          .WithMessage("Name field must not be empty");

        RuleFor(x => x.RecipeId)
          .Empty()
          .WithMessage("Recipe ids cannot be set during creation");

        CommonRules();
      });

      // Default Rules
      RuleFor(x => x.Id)
        .NotEqual(0)
        .When(x => x.RecipeId != 0);

      RuleFor(x => x.RecipeId)
        .NotEqual(0)
        .When(x => x.Id != 0);

      CommonRules();
    }

    private void CommonRules()
    {
      RuleFor(x => x.UOMId)
        .NotEmpty()
        .Length(1, 50)
        .WithName("uom");

      RuleFor(x => x.Name)
        .NotEmpty()
        .Length(3, 50);

      RuleFor(x => x.Quantity)
        .GreaterThanOrEqualTo(0)
        .LessThanOrEqualTo(100000);
    }
  }
}
