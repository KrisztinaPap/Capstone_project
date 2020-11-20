using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{

  [ApiController]
  [Route("api/[controller]")]
  public class IngredientsController : ControllerBase
  {
    private readonly DBContext _context;
    public IngredientsController(DBContext context)
    {
      _context = context;
    }

    // GET: api/ingredients/{name}
    [HttpGet]
    [Route("{name:required}")]
    public ActionResult<IEnumerable<Ingredient>> GetIngredientsByName(string name)
    {
      // This API endpoint will search the database and look for entries inside the ingredients table similar to the given parameter: name.
      // Returns a list of objects (Ingredients) with the properties of: ID, Name.
      /*
       * Citation: How to use the LIKE function in LINQ query.
       * Link @ https://stackoverflow.com/questions/57432633/use-like-in-linq-query-ef-core
       */
      var result = _context.Ingredients
                    .Where(x => EF.Functions.Like(x.Name, $"%{name}%") )
                    .Select(x => new { x.Id, x.Name } )
                    .ToList();

      if (result.Count <= 0 )
      {
        return NotFound();
      }

      return Ok(result);
    }
  }
}
