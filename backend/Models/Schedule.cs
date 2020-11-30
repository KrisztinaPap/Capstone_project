using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;

namespace Api.Models
{

  public class ScheduleValidator : AbstractValidator<Schedule>
  {

    private readonly DBContext _context;

    public ScheduleValidator(DBContext context)
    {
      _context = context;

      RuleSet("CreateSchedulePlan", CreateSchedulePlanRules);
    }

    private void CreateSchedulePlanRules()
    {
      RuleFor(x => x.UserId)
        .NotEmpty()
        .Must(ValidateUserId).WithMessage("Invalid User ID");

      RuleFor(x => x.Day)
        .NotEmpty();

      RuleFor(x => x.MealTimeId)
        .NotEmpty()
        .NotEqual(0)
        .Must(ValidateMealTimeId).WithMessage("Invalid Meal Time");

      RuleFor(x => x.RecipeId)
        .NotEmpty()
        .NotEqual(0)
        .Must(ValidateRecipeId).WithMessage("Invalid Recipe");

      bool ValidateUserId(string userId)
      {
        /**
         * Function checks if userId exists in the Users table
         *
         * @param <string> userId
         * @return <bool> true if userId exists, false if userId does not exist
         */

        return _context.Users.Any(x => x.Id == userId);
      }

      bool ValidateMealTimeId(int mealTimeId)
      {
        /**
         * Function checks if mealTimeId exists in the MealTime table
         *
         * @param <string> mealTimeId
         * @return <bool> true if mealTimeId exists, false if mealTimeId does not exist
         */

        return _context.MealTimes.Any(x => x.Id == mealTimeId);
      }

      bool ValidateRecipeId(int recipeId)
      {
        /**
         * Function checks if recipeId exists in the Recipes table
         *
         * @param <string> recipeId
         * @return <bool> true if recipeId exists, false if recipeId does not exist
         */

        return _context.Recipes.Any(x => x.Id == recipeId);
      }
    }

  }

  public class Schedule
  {

    public int PlanId { get; set; }

    public string UserId { get; set; }

    public DateTime Day { get; set; }

    public int MealId { get; set; }

    public Meal Meals { get; set; }

    public int MealTimeId { get; set; }

    public MealTime MealTimes { get; set; }

    public string MealTimeName { get; set; }

    public int RecipeId { get; set; }

    public Schedule()
    {
    }

  }
}
