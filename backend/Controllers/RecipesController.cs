using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using FluentValidation;
using FluentValidation.AspNetCore;

using Api.Models;
using System.IO;
using System.Web;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Api.Authentication;
using System.Security.Claims;

namespace Api.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class RecipesController : ControllerBase
  {
    private readonly ILogger<RecipesController> _logger;

    private readonly DBContext _context;

    private readonly IWebHostEnvironment hostingEnvironment;

    private readonly UserManager<User> userManager;
    // The UserManager class provides a persistent store for managing users.
    private readonly RoleManager<IdentityRole> roleManager;
    // The RoleManager class provides a persistent store for manaing user roles.
    // It tracks roles for users by roleID and provides role names.

    public RecipesController(ILogger<RecipesController> logger, DBContext context, IWebHostEnvironment _hostingEnvironment,
                             UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
    {
      _logger = logger;
      _context = context;
      hostingEnvironment = _hostingEnvironment;
      this.userManager = userManager;
      this.roleManager = roleManager;
    }

    // GET: api/recipes
    [HttpGet]
    [Authorize]
    public ActionResult<IEnumerable<Recipe>> Index(int offset = 0, int limit = 50)
    {
      // Don't allow users to query more than 100
      // recipe entries at a time.
      limit = Math.Clamp(limit, 10, 100);
      string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

      var results = _context.Recipes
              .Include(x => x.Ingredients)
              .Where(x => x.UserId == userId)
              .OrderBy(x => x.Name)
              .Skip(offset)
              .Take(limit)
              .ToList();

      return Ok(results);
    }

    // GET: api/recipes/{id}
    [HttpGet]
    [Route("{id:int:required}")]
    [Authorize]
    public ActionResult<Recipe> Get(int id)
    {
      var result = _context.Recipes
                    .Include(x => x.Ingredients)
                    .Where(x => x.Id == id)
                    .SingleOrDefault();

      if (result == null) { return NotFound(); }

      return Ok(result);
    }

    // POST: api/recipes
    [HttpPost]
    [Authorize]
    public ActionResult<Recipe> Create([CustomizeValidator(RuleSet="Create")] [FromBody] Recipe newRecipe)
    {
      string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
      newRecipe.UserId = userId; // Ensure the userid belongs to the currently logged in user.

      ICollection<Ingredient> recipeIngredients = newRecipe.Ingredients.ToList();
      newRecipe.Ingredients.Clear();
      _context.Recipes.Add(newRecipe);
      _context.SaveChanges();

      foreach(Ingredient ingredient in recipeIngredients)
      {
        Ingredient newIngredient = new Ingredient()
        {
          RecipeId = newRecipe.Id,
          Name = ingredient.Name,
          Quantity = ingredient.Quantity,
          UOMId = ingredient.UOMId,
        };
        newRecipe.Ingredients.Add(newIngredient);
      }
      _context.SaveChanges();
      return CreatedAtAction(nameof(Get), new {newRecipe.Id}, newRecipe);
    }

    // PUT: api/recipes/id
    [HttpPut]
    [Route("{id:int:required}")]
    [Authorize]
    public ActionResult Update(int id, [FromBody] Recipe recipe)
    {
      string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
      recipe.UserId = userId; // Ensure the userid belongs to the currently logged in user.

      // Note: Below is Kenji's solution just slightly refactored to
      //       take advantage of `CurrentValues.SetValues`
      //          —Aaron
      Recipe oldRecipe = _context.Recipes
        .Where(x => x.Id == id)
        .Include(x => x.Ingredients)
        .SingleOrDefault();

      if (oldRecipe == null) {
        return NotFound();
      }

      // Updates all of the changed values from the oldrecipe
      // to the new recipe.
      _context.Entry(oldRecipe).CurrentValues.SetValues(recipe);

      // Delete any ingredients currently in the recipe that are not
      // in the update.
      foreach (var existingIngredient in oldRecipe.Ingredients.ToList())
      {
        if (!recipe.Ingredients.Any(oldIngredient => oldIngredient.Id == existingIngredient.Id))
        {
          _context.Ingredients.Remove(existingIngredient);
        }
      }

      // Update or Insert incoming ingredients
      foreach (var ingredient in recipe.Ingredients)
      {
        // Look up the ingredient by given ingredientId & recipeId.
        // This ensures we don't pull ingredients from other users recipes.
        var existingIngredient = oldRecipe.Ingredients
          .Where(x => x.Id == ingredient.Id && x.RecipeId == oldRecipe.Id)
          .SingleOrDefault();

        if (existingIngredient != null)
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
    [Route("{id:int:required}")]
    [Authorize]
    public ActionResult<Recipe> Delete(int id)
    {
      Recipe recipe = _context.Recipes
          .Where(x => x.Id == id)
          .Include(x => x.Ingredients)
          .SingleOrDefault();

      if (recipe == null) {
        return NotFound();
      }

      _context.Remove(recipe);
      _context.SaveChanges();
      return NoContent();
    }

    [HttpPost]
    [Route("image-upload")]
    [Authorize]
    public ActionResult<string> UploadImage(IFormFile fileUpload)
    {
      // This API endpoint will save the image file to the project files.
      // It will then return the file path to the image in the project folder.
      string message = "";

      // Citation: A method of accepting image files from a form for the recipe pages was needed.
      // The following code was adapted from the source below:
      // link @ https://www.youtube.com/watch?v=aoxEJii70_I

      string requestUserID = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
      if (fileUpload != null)
      {
        // Create path to the users images.
        string uploadsFolder = $"images/User_{requestUserID}";

        // Create unique file name.
        string uniqueFileName = Guid.NewGuid().ToString() + "_" + fileUpload.FileName;
        string filePath = Path.Combine(hostingEnvironment.WebRootPath, uploadsFolder, uniqueFileName);

        // Copy the file to the users folder.
        fileUpload.CopyTo(new FileStream(filePath, FileMode.Create));

        // Return the folder path to the new image.
        return Path.Combine(uploadsFolder, uniqueFileName);
      }
      else
      {
        if(fileUpload == null)
        {
          message += "No file found.";
        }
        return message;
      }
    }

    [NonAction]
    public bool SameUser()
    {
      // Summary:
      //  This function will check the user manager store credentials with the incoming HTTP request credentials to verfiy the user is the same as the one logged in. It will return true if they match and false otherwise.
      bool result;
      ClaimsPrincipal currentUser = this.User;
      string claimUserID = userManager.GetUserId(currentUser);
      string requestUserID = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
      if( claimUserID == requestUserID)
      {
        result = true;
      }
      else
      {
        result = false;
      }
      return result;
    }
  }
}
