using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using FluentValidation;
using FluentValidation.AspNetCore;

using Api.Models;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecipesController : ControllerBase
    {
      private readonly ILogger<RecipesController> _logger;

      private readonly DBContext _context;

      public RecipesController(ILogger<RecipesController> logger, DBContext context)
      {
          _logger = logger;
          _context = context;
      }

      // TODO: We need to extract our calls to _context to
      //       some kind of Repository/QueryHandler pattern.
      //       That way we're consistent with our access to
      //       recipes and we can easily apply business rules
      //       because as of right now there is nothing enforcing
      //       Recipe names being unique per user or anything like
      //       that.

      // TODO: Missing Authentication. Meaning most of these routes
      //       will likely change a bit once authentication is enabled
      //       We'll very likely implement AuthorizationTokens via
      //       HTTP_HEADERS so that these actions can just
      //       pull the "current logged" in user.

      // GET: api/recipes
      [HttpGet]
      public ActionResult<IEnumerable<Recipe>> Index(int offset=0, int limit=50)
      {
        // Don't allow users to query more than 100
        // recipe entries at a time.
        limit = Math.Clamp(limit, 10, 100);

        var results = _context.Recipes
                .Include(x => x.Ingredients)
                .OrderBy(x => x.Name)
                .Skip(offset)
                .Take(limit)
                .ToList();

        return Ok(results);
      }

      // GET: api/recipes/{id}
      [HttpGet]
      [Route("{id:int:required}")]
      public ActionResult<Recipe> Get(int id)
      {
        var result = _context.Recipes
                      .Include(x => x.Ingredients)
                      .Where(x => x.Id == id)
                      .SingleOrDefault();

        if(result == null) { return NotFound(); }

        return Ok(result);
      }

      // POST: api/recipes
      [HttpPost]
      public ActionResult<Recipe> Create(
        [CustomizeValidator(RuleSet="Create")] [FromBody] Recipe newRecipe)
      {
        _context.Recipes.Add(newRecipe);
        _context.SaveChanges();

        return Created("Get", newRecipe);
      }

      // PUT: api/recipes/id
      [HttpPut]
      public ActionResult<Recipe> Update(int id, [CustomizeValidator(RuleSet="Update")] [FromBody] Recipe recipe)
      {
        return BadRequest();
      }

      // DELETE: api/recipes/id
      [HttpDelete]
      public ActionResult<Recipe> Delete(int id)
      {
        return BadRequest();
      }
    }
}
