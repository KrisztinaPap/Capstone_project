using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Models;
using Microsoft.AspNetCore.Mvc;

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

    // GET: api/ingredients
    [HttpGet]
    [Route("{name:varchar(30):required}")]
    public ActionResult<Ingredient> GetIngredientsByName(string name)
    {
      var result = _context.Ingredients
                    .Where(x => x.Name == name)
                    .SingleOrDefault();

      if (result == null )
      {
        return NotFound();
      }

      return result;
    }
  }
}
