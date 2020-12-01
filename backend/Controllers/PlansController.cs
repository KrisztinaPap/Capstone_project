using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FluentValidation.AspNetCore;

using Api.Models;

namespace Api.Controllers
{

  /*
   * TODO
   * Shorten the API EndPoints by removing all User & UserId references when Identity/User Authentication is implemented on the frontend as well
   * Recommendations from Aaron
   */


  [ApiController]
  [Route("api/[controller]")]
  public class PlansController : ControllerBase
  {

    private readonly DBContext _context;

    public PlansController(DBContext context)
    {
      _context = context;
    }

    // POST: api/plans/
    [HttpPost]
    public ActionResult<Plan> CreateSchedulePlan([CustomizeValidator(RuleSet = "CreateSchedulePlan")][FromBody] Schedule schedule)
    {
      /**
       * Function creates a new plan for a user
       * 
       * @param <Schedule> Body JSON - UserId, Day, MealTimeId, RecipeId
       * @return <Schedule> Plan data in Schedule Model
       */

      Plan plan_ = new Plan
                  {
                    UserId = schedule.UserId,
                    Day = schedule.Day
                  };
      Meal meal_ = new Meal
                  {
                    PlanId = plan_.Id,
                    MealTimeId = schedule.MealTimeId
                  };
      MealRecipe mealRecipe_ = new MealRecipe
                              {
                                MealId = meal_.Id,
                                RecipeId = schedule.RecipeId
                              };
      meal_.MealRecipes.Add(mealRecipe_);
      plan_.Meals.Add(meal_);
      _context.Add(plan_);
      _context.SaveChanges();

      return GetPlanById(plan_.Id);
    }

    // GET: api/plans/{id}
    [HttpGet]
    [Route("{id:int:required}")]
    public ActionResult<Plan> GetPlanById(int id)
    {
      /**
       * Function returns a plan along with its meal type, recipe and ingredients
       * 
       * @param <int> id
       * @return <Plan> Plan data
       */

      var result = _context.Plans
                    .Include(x => x.Meals)
                      .ThenInclude(x => x.MealTime)
                    .Include(x => x.Meals)
                      .ThenInclude(x => x.MealRecipes)
                        .ThenInclude(x => x.Recipe)
                          .ThenInclude(x => x.Ingredients)
                    .Where(x => x.Id == id)
                    .Select
                     (
                      x => new
                      {
                        day = x.Day,
                        meals = x.Meals.Select
                        (
                          m => new
                          {
                            id = m.Id,
                            mealTime = m.MealTime.Name,
                            recipeId = m.MealRecipes.Select
                            (
                              mr => mr.RecipeId
                            )
                          }
                        )
                      }
                     )
                    .SingleOrDefault();

      if (result == null)
      {
        return NotFound();
      }

      return Ok(result);
    }

    // GET: api/plans/user/{userId}
    [HttpGet]
    [Route("user/{userId:required}")]
    public ActionResult<IEnumerable<Plan>> GetUserPlans(string userId)
    {
      /**
       * Function returns all user's plans along with their meal types, recipes and ingredients
       * 
       * @param <int> User Id
       * @return <Plan> Plan data
       */

      var result = _context.Plans
                    .Include(x => x.Meals)
                      .ThenInclude(x => x.MealTime)
                    .Include(x => x.Meals)
                      .ThenInclude(x => x.MealRecipes)
                        .ThenInclude(x => x.Recipe)
                          .ThenInclude(x => x.Ingredients)
                    .Where(x => x.UserId == userId)
                    .Select
                     (
                      x => new
                      {
                        day = x.Day,
                        meals = x.Meals.Select
                        (
                          m => new
                          {
                            id = m.Id,
                            mealTime = m.MealTime.Name,
                            recipeId = m.MealRecipes.Select
                            (
                              mr => mr.RecipeId
                            )
                          }
                        )
                      }
                     )
                    .ToList();

      if (result.Count == 0)
      {
        return NotFound();
      }

      return Ok(result);
    }

    // GET: api/plans/user/{userId}/schedule?fromDate={fromDate}=&toDate={toDate}
    [HttpGet]
    [Route("user/{userId:required}/schedule")]
    public ActionResult<IEnumerable<Plan>> GetUserSchedulePlans(string userId, DateTime fromDate, DateTime toDate)
    {
      /**
       * Function returns all user's plans along with their meal types, recipes and ingredients within the from and to Dates
       * 
       * @param <int> User Id, <DateTime> fromDate, <DateTime> toDate
       * @return <Plan> Plan data
       */

      var result = _context.Plans
                    .Include(x => x.Meals)
                      .ThenInclude(x => x.MealTime)
                    .Include(x => x.Meals)
                      .ThenInclude(x => x.MealRecipes)
                        .ThenInclude(x => x.Recipe)
                          .ThenInclude(x => x.Ingredients)
                    .Where(x => x.UserId == userId && x.Day >= fromDate && x.Day <= toDate)
                    .Select
                     (
                      x => new
                      {
                        day = x.Day,
                        meals = x.Meals.Select
                        (
                          m => new
                          {
                            id = m.Id,
                            mealTime = m.MealTime.Name,
                            recipeId = m.MealRecipes.Select
                            (
                              mr => mr.RecipeId
                            )
                          }
                        )
                      }
                     )
                    .ToList();

      if (result.Count == 0)
      {
        return NotFound();
      }

      return Ok(result);
    }

  }
}
