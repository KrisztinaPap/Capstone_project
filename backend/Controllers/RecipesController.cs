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

      // PUT: api/recipes/update
      [HttpPut]
      [Route("update")]
      public ActionResult<Recipe> Update(int id, [CustomizeValidator(RuleSet = "Update")][FromBody] Recipe recipe)
      {
        // This action will update a recipe in the database.
        // Params: id, Recipe

        Recipe recipeToUpdate = _context.Recipes.Include(x=>x.Ingredients).Where(x => x.Id == id).SingleOrDefault();
        if(recipeToUpdate == null)
        {
          return BadRequest();  
        }

        recipeToUpdate.Name = recipe.Name;
        recipeToUpdate.CategoryId = recipe.CategoryId;
        recipeToUpdate.Fat = recipe.Fat;
        recipeToUpdate.Protein = recipe.Protein;
        recipeToUpdate.Carbohydrates = recipe.Carbohydrates;
        recipeToUpdate.Instructions = recipe.Instructions;
        recipeToUpdate.Tags = recipe.Tags;
        recipeToUpdate.Image = recipe.Image;
        recipeToUpdate.DateModified = DateTime.Today;
        // Leave DateCreated alone.
        recipeToUpdate.PrepTime = recipe.PrepTime;
        recipeToUpdate.Servings = recipe.Servings;
        // Recipe Ingredients accessor is currently set to private for set.
        // recipeToUpdate.Ingredients = recipe.Ingredients;
        recipeToUpdate.Notes = recipe.Notes;

      // Collections
      recipeToUpdate.MealRecipes = recipe.MealRecipes;
      recipeToUpdate.RecipeCategory = recipe.RecipeCategory;

      // Ensure each ingredient on the new recipe is inside the original.
      foreach (Ingredient ingredient in recipe.Ingredients)
        {
          if (!recipeToUpdate.Ingredients.Contains(ingredient))
          {
            // Create a new ingredient and add it to the recipe.
            // IngredientsController.CreateIngredient(params);
          }
          else
          {
            // If the ingredient is already in the recipe,
            // Check the quantity and measurement to ensure that amount is the same.
            Ingredient individualIngredient = recipeToUpdate.Ingredients.Where(x => x.Name == ingredient.Name).SingleOrDefault();
            individualIngredient.Quantity = ingredient.Quantity;
            individualIngredient.UOMId = ingredient.UOMId;
          }
        }
      // Ensure that any old ingredients that are not on the new updated recipe are removed.
      List<Ingredient> ingredientList = recipeToUpdate.Ingredients.ToList();

      foreach (Ingredient ingredient in ingredientList)
      {
        if (!recipe.Ingredients.Contains(ingredient))
        {
          // Remove the ingredient from the recipeToUpdate.Ingredients list.
          recipeToUpdate.Ingredients.Remove(ingredient);
          // Delete the ingredient from the database as well?
        }
      }
      // Save changes in the transaction.
      _context.SaveChanges();
          return recipeToUpdate;
      }

      // DELETE: api/recipes/id
      [HttpDelete]
      public ActionResult<Recipe> Delete(int id)
      {
        return BadRequest();
      }
    }
}
