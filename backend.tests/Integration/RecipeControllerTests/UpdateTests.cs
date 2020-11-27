using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Net.Http;
using Xunit;
using FluentAssertions;

using Api.Models;

namespace Api.Tests.Integration.RecipeControllerTests
{
  [Collection("Integration")]
  public class UpdateTests
    : IClassFixture<ApplicationFactory<Startup>>
  {
    private const int TestCategory = -1;
    private const string TestInstructions = "1. Throw all ingredients in a bowl & mix";

    private readonly HttpClient client;
    private readonly DBContext context;

    public UpdateTests(ApplicationFactory<Startup> factory) {
      client = factory.CreateClient();
      context = (DBContext)factory.Services.GetService(typeof(DBContext));
    }

    [Fact]
    [AutoRollback]
    public async void Ensure_IngredientRecipeIdMatchesRecipeId()
    {
      int recipeId = -3;
      var body = new {
        Id = recipeId,
        Name = "Test Recipe",
        Category = TestCategory,
        Instructions = TestInstructions,
        Ingredients = new[] {
          new {
            Id = -8,
            RecipeId = -500,
            Name = "Chicken Breast",
            Quantity = 3,
            UOM = "lb",
          },
        }
      };

      var response = await client.PutAsync($"/api/recipes/{recipeId}",
        HttpHelper.AsStringContent(body)
      );

      response.Should().Be400BadRequest()
        .And.HaveErrorMessage("*must match recipe id*");
    }


    [Fact]
    [AutoRollback]
    public async void Ensure_RecipeIsUpdateable()
    {
      int recipeId = -1;
      string name = "Test Recipe";
      string ingredientName = "Ingredient1";
      Recipe updatedRecipe;
      Recipe recipe;
      var recipeResponse = await client.GetAsync($"/api/recipes/{recipeId}");
      recipe = await HttpHelper.ResponseAsObject<Recipe>(recipeResponse);

      recipe.Name = name;
      recipe.Ingredients.First().Name = ingredientName;
      var response = await client.PutAsync($"/api/recipes/{recipeId}",
        HttpHelper.AsStringContent(recipe)
      );

      response.Should().Be204NoContent();

      updatedRecipe = context.Recipes
        .AsNoTracking() // ensure we dont return cached results
        .Where(x=> x.Id == recipeId)
        .Include(x => x.Ingredients)
        .Single();
      updatedRecipe.Name.Should().Be(name);
      updatedRecipe.Ingredients.First().Name.Should().Be(ingredientName);
    }

    [Fact]
    [AutoRollback]
    public async void Ensure_IngredientsAreRemoved()
    {
      int recipeId = -1;
      Recipe updatedRecipe;
      Recipe recipe;
      Ingredient removedIngredient;
      var recipeResponse = await client.GetAsync($"/api/recipes/{recipeId}");
      recipe = await HttpHelper.ResponseAsObject<Recipe>(recipeResponse);
      removedIngredient = recipe.Ingredients.ElementAt(0);
      recipe.Ingredients.Remove(removedIngredient);

      var response = await client.PutAsync($"/api/recipes/{recipeId}",
        HttpHelper.AsStringContent(recipe)
      );
      updatedRecipe = context.Recipes
        .Where(x=> x.Id == recipeId)
        .Include(x => x.Ingredients)
        .Single();

      response.Should().Be204NoContent();
      updatedRecipe.Ingredients.Should().NotContain(removedIngredient);
    }

    [Fact]
    [AutoRollback]
    public async void Ensure_NewIngredientsAreCreated()
    {
      int recipeId = -1;
      Recipe updatedRecipe;
      Recipe recipe;
      Ingredient newIngredient = new Ingredient() {Name="Ingredient1", UOMId="cup", Quantity=1m};
      var recipeResponse = await client.GetAsync($"/api/recipes/{recipeId}");
      recipe = await HttpHelper.ResponseAsObject<Recipe>(recipeResponse);
      recipe.Ingredients.Add(newIngredient);

      var response = await client.PutAsync($"/api/recipes/{recipeId}",
        HttpHelper.AsStringContent(recipe)
      );
      updatedRecipe = context.Recipes
        .Where(x=> x.Id == recipeId)
        .Include(x => x.Ingredients)
        .Single();

      response.Should().Be204NoContent();
      updatedRecipe.Ingredients.Should()
        .ContainSingle(x => x.Name == "Ingredient1")
        .And.Contain(x => x.RecipeId == recipeId);
    }

    [Fact]
    [AutoRollback]
    public async void Ensure_NewIngredients_SpecifyingId()
    {
      int recipeId = -1;
      Recipe recipe;
      Ingredient newIngredient = new Ingredient() {Id=-500, RecipeId=-1, Name="TestIngredient", UOMId="cup", Quantity=1m};
      var recipeResponse = await client.GetAsync($"/api/recipes/{recipeId}");
      recipe = await HttpHelper.ResponseAsObject<Recipe>(recipeResponse);
      recipe.Ingredients.Add(newIngredient);


      var response = await client.PutAsync($"/api/recipes/{recipeId}",
        HttpHelper.AsStringContent(recipe)
      );

      Recipe updatedRecipe = context.Recipes
        .AsNoTracking()
        .Where(x=> x.Id == recipeId)
        .Include(x => x.Ingredients)
        .Single();

      var ingredient = updatedRecipe.Ingredients
        .Where(x => x.Name == "TestIngredient")
        .SingleOrDefault();


      response.Should().Be204NoContent();
      ingredient.Should().NotBeNull();
      ingredient.Id.Should().NotBe(-500);
    }

    [Fact]
    [AutoRollback]
    public async void Ensure_NewIngredients_ReturnsNotFoundOnInvalidId()
    {
      int recipeId = -400;
      var body = new {
        Id = recipeId,
        Name = "Test Recipe",
        Category = TestCategory,
        Instructions = TestInstructions,
        Ingredients = new[] {
          new {
            Name = "Chicken Breast",
            Quantity = 3,
            UOM = "lb",
          },
        }
      };

      var response = await client.PutAsync($"/api/recipes/{recipeId}",
        HttpHelper.AsStringContent(body)
      );

      response.Should().Be404NotFound();
    }
  }
}
