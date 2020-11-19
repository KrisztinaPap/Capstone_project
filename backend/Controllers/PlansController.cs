using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

    // GET: api/plans/{id}
    [HttpGet]
    [Route("{id:int:required}")]
    public ActionResult<Plan> GetPlanById(int id)
    {
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

    // GET: api/plans/user/{UserId}
    [HttpGet]
    [Route("user/{userid:int:required}")]
    public ActionResult<IEnumerable<Plan>> GetUserPlans(int userId)
    {
      var result = _context.Plans
                    .Include(x => x.Meals)
                      .ThenInclude(x => x.MealTime)
                    .Include(x => x.Meals)
                      .ThenInclude(x => x.MealRecipes)
                        .ThenInclude(x => x.Recipe)
                          .ThenInclude(x => x.Ingredients)
                    .Where(x => x.UserId == userId)
                    .SingleOrDefault();

      if (result == null)
      {
        return NotFound();
      }

      return Ok(result);
    }

  }
}
