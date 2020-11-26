using System.Linq;
using FluentValidation;

namespace Api.Models.Validators
{

  public class RecipeValidator : AbstractValidator<Recipe> {
    private readonly DBContext _context;
    private readonly IngredientValidator _ingredientValidator;

    public RecipeValidator(DBContext context, IngredientValidator ingredientValidator) {
      _context = context;
      _ingredientValidator = ingredientValidator;

      RuleSet("Create", () => {
        RuleFor(x => x.Id)
          .Empty()
          .WithMessage("Cannot set id of a recipe during creation");

        RuleForEach(x => x.Ingredients)
          .SetValidator(_ingredientValidator, "Create");

        CommonRules();
      });

      // Default Rules
      RuleFor(x => x.Id)
        .NotEqual(0);

      RuleForEach(x => x.Ingredients)
        .SetValidator(_ingredientValidator);

      RuleForEach(x => x.Ingredients)
        .Must((x, y) => RecipeIdsMatch(x, y))
        .WithMessage("Ingredient recipeId must match recipe id.");


      // TODO: Add validation for unique recipe names per user
      //       Blocked waiting for identity.

      CommonRules();
    }

    private bool RecipeIdsMatch(Recipe recipe, Ingredient ingredient)
    {
      // If the ingredient.Id is == 0 then
      // the current ingredient is being newly created
      // so it won't have a recipeId assigned yet.

      return ingredient.Id == 0 || recipe.Id == ingredient.RecipeId;
    }

    private void CommonRules() {
      RuleFor(x => x.CategoryId)
        .NotEqual(0)
        .WithName("category");

      RuleFor(x => x.Name)
        .NotEmpty()
        .Length(3, 50);

      RuleFor(x => x.Fat)
        .GreaterThanOrEqualTo(0)
        .LessThanOrEqualTo(100000);

      RuleFor(x => x.Protein)
        .GreaterThanOrEqualTo(0)
        .LessThanOrEqualTo(100000);

      RuleFor(x => x.Carbohydrates)
        .GreaterThanOrEqualTo(0)
        .LessThanOrEqualTo(100000);

      RuleFor(x => x.Calories)
        .GreaterThanOrEqualTo(0)
        .LessThanOrEqualTo(100000);

      RuleFor(x => x.Instructions)
        .Length(10, 60000);

      RuleFor(x => x.Notes)
        .Length(0, 5000);

      RuleFor(x => x.Servings)
        .GreaterThanOrEqualTo(1)
        .LessThanOrEqualTo(1000);

      RuleFor(x => x.PrepTime)
        .GreaterThanOrEqualTo(0)
        .LessThanOrEqualTo(6000);

      RuleFor(x => x.Image)
        .NotNull();

      RuleFor(x => x.Ingredients)
        .NotEmpty();
    }
  }
}
