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

  [ApiController]
  [Route("api/[controller]")]
  public class PlansController : ControllerBase
  {

    private readonly DBContext _context;

    public PlansController(DBContext context)
    {
      _context = context;
    }

    // POST: api/plans/create/
    [HttpPost]
    [Route("create")]
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
                    .SingleOrDefault();

      if (result == null)
      {
        return NotFound();
      }

      return Ok(result);
    }

    // GET: api/plans/user/{userId}
    [HttpGet]
    [Route("user/{userId:int:required}")]
    public ActionResult<IEnumerable<Plan>> GetUserPlans(int userId)
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
                    .ToList();

      if (result.Count == 0)
      {
        return NotFound();
      }

      return Ok(result);
    }

    // GET: api/plans/user/{userId}/schedule/{fromDate}/{toDate}
    [HttpGet]
    [Route("user/{userId:int:required}/schedule/{fromDate:DateTime:required}/{toDate:DateTime:required}")]
    public ActionResult<IEnumerable<Plan>> GetUserSchedulePlans(int userId, DateTime fromDate, DateTime toDate)
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
                    .ToList();

      if (result.Count == 0)
      {
        return NotFound();
      }

      return Ok(result);
    }

  }
}
