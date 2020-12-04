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
    private readonly string _currentUserId;

    public PlansController(DBContext context)
    {
      _context = context;
      // _currentUserId = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
      _currentUserId = "-1";
    }

    // PUT: api/plans/
    [HttpPut]
    public ActionResult<Plan> CreateSchedulePlan([FromBody] ICollection<SchedulePlan> incomingPlans)
    {
      /**
       * Function creates a new plan for a user
       *
       * @param List<Schedule> Body JSON - UserId, Day, MealTimeId, RecipeId
       * @return NoCotent
       */

      ICollection<DateTime> daysToUpdate = incomingPlans.Select(x => x.Day.Date).ToList();

      ICollection<MealTime> mealTimes = _context.MealTimes.ToList();
      ICollection<Plan> oldPlans = _context.Plans
        .Include(x => x.Meals)
        .ThenInclude(x => x.MealRecipes)
        .Where(x => daysToUpdate.Contains(x.Day) && x.UserId == _currentUserId)
        .ToList();

      foreach(SchedulePlan incomingPlan in incomingPlans) {

        Plan oldPlan = oldPlans.FirstOrDefault(x => x.Day == incomingPlan.Day);

        Plan currentPlan;
        if(oldPlan == null) {
          // Creating a new plan
          currentPlan = new Plan() {
            Day = incomingPlan.Day,
            UserId = _currentUserId
          };
          _context.Attach(currentPlan);
        }
        else
        {
          currentPlan = oldPlan;
        }

        // Delete all of our current meals and recreate
        _context.Meals.RemoveRange(currentPlan.Meals);

        if(incomingPlan.Meals.Count == 0) {
          // If there are no meals then remove
          // the current plan
          _context.Remove(currentPlan);
        }
        else
        {
          // Add all of the incoming meals
          foreach(var incomingMeal in incomingPlan.Meals)
          {
            MealTime time = mealTimes
              .First(x => x.Name.Equals(incomingMeal.MealTime, StringComparison.OrdinalIgnoreCase));

            var newMeal = new Meal() {
              MealTimeId = time.Id
            };

            newMeal.MealRecipes.Add(new MealRecipe() { RecipeId = incomingMeal.Recipes.First() });
            currentPlan.Meals.Add(newMeal);
          }
        }
      }
      _context.SaveChanges();
      return NoContent();
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
                            recipes = m.MealRecipes.Select
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
                            recipes = m.MealRecipes.Select
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

    // GET: api/plans/schedule?fromDate={fromDate}=&toDate={toDate}
    [HttpGet]
    [Route("schedule/")]
    public ActionResult<IEnumerable<Plan>> GetUserSchedulePlans(DateTime fromDate, DateTime toDate)
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
                    .Where(x => x.UserId == _currentUserId && x.Day >= fromDate && x.Day <= toDate)
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
                            recipes = m.MealRecipes.Select
                            (
                              mr => mr.RecipeId
                            )
                          }
                        )
                      }
                     )
                    .ToList();

      return Ok(result);
    }

  }
}
