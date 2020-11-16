using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using FluentValidation;
using FluentValidation.Results;

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

      [HttpGet]
      public ActionResult<Recipe> Get()
      {
        Recipe recipe = new Recipe("Special Apple Pie");
        recipe.Fat = 32;

        RecipeValidator validator = new RecipeValidator();


        var result = validator.Validate(recipe);

        if(!result.IsValid)
        {
          return BadRequest(result);
        }

        return recipe;
      }
    }
}
