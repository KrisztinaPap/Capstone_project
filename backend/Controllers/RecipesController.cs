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
        [CustomizeValidator(RuleSet="Create,default")] [FromBody] Recipe newRecipe)
      {
        _context.Recipes.Add(newRecipe);
        _context.SaveChanges();

        return CreatedAtAction(nameof(Get), new {newRecipe.Id}, newRecipe);
      }


      // PUT: api/recipes/id
      [HttpPut]
      [Route("{id:int:required}")]
      public ActionResult Update(int id, [FromBody] Recipe recipe)
      {
        // Note: Below is Kenji's solution just slightly refactored to
        //       take advantage of `CurrentValues.SetValues`
        //          —Aaron

        Recipe oldRecipe = _context.Recipes
          .Where(x => x.Id == id)
          .Include(x => x.Ingredients)
          .SingleOrDefault();

        if(oldRecipe == null) {
          return NotFound();
        }

        // Updates all of the changed values from the oldrecipe
        // to the new recipe.
        _context.Entry(oldRecipe).CurrentValues.SetValues(recipe);

        // Delete any ingredients currently in the recipe that are not
        // in the update.
        foreach(var existingIngredient in oldRecipe.Ingredients.ToList())
        {
          if(!recipe.Ingredients.Any(oldIngredient => oldIngredient.Id == existingIngredient.Id))
          {
            _context.Ingredients.Remove(existingIngredient);
          }
        }

        // Update or Insert incoming ingredients
        foreach(var ingredient in recipe.Ingredients)
        {
          // Look up the ingredient by given ingredientId & recipeId.
          // This ensures we don't pull ingredients from other users recipes.
          var existingIngredient = oldRecipe.Ingredients
            .Where(x => x.Id == ingredient.Id && x.RecipeId == oldRecipe.Id)
            .SingleOrDefault();

          if(existingIngredient != null)
          {
            _context.Entry(existingIngredient).CurrentValues.SetValues(ingredient);
          }
          else
          {
            // Reset the ingredient and recipe id's to prevent
            // ID injections.
            ingredient.Id = 0;
            ingredient.RecipeId = 0;
            oldRecipe.Ingredients.Add(ingredient);
          }
        }

        _context.SaveChanges();
        return NoContent();
      }


      // DELETE: api/recipes/id
      [HttpDelete]
      public ActionResult<Recipe> Delete(int id)
      {
        return BadRequest();
      }
    }
}
