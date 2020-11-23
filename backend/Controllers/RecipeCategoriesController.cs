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
  public class RecipeCategoriesController : ControllerBase
  {
    private readonly DBContext _context;

    public RecipeCategoriesController(DBContext context)
    {
      _context = context;
    }

    [HttpGet]
    [Route("Options")]
    public ActionResult<IEnumerable<RecipeCategory>> GetAllRecipeCategoryOptions()
    {
      // This endpoint will return a list of the recipe categories in the database.
      var result = _context.RecipeCategories
        .Select(x => new { x.Id, x.Name } )
        .ToList();

      if (result.Count <= 0)
      {
        return NotFound();
      }

      return Ok(result);
    }
  }
}
