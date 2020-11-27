using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Net.Http;
using Xunit;
using FluentAssertions;

using Api.Models;
using System.Transactions;

namespace Api.Tests.Integration.RecipeControllerTests
{
  [Collection("Integration")]
  public class DeleteTests
    : IClassFixture<ApplicationFactory<Startup>>
  {
    private readonly HttpClient client;
    private readonly DBContext context;

    public DeleteTests(ApplicationFactory<Startup> factory) {
      client = factory.CreateClient();
      context = (DBContext)factory.Services.GetService(typeof(DBContext));
    }

    [Fact]
    public async void Return_404NotFound_IfRecipeDoesntExist()
    {
      int recipeId = -500;

      var response = await client.DeleteAsync($"/api/recipes/{recipeId}");

      response.Should().Be404NotFound();
    }

    [Fact]
    public async void Ensure_RecipeIsDeleted()
    {
      int recipeId = -1;
      var recipe = context.Recipes
      .AsNoTracking() // ef cache busting
      .Where(x => x.Id == recipeId)
      .Single();

      try
      {
        var response = await client.DeleteAsync($"/api/recipes/{recipeId}");
        var deletedRecipe = context.Recipes
        .AsNoTracking() // ef cache busting
        .Where(x => x.Id == recipeId)
        .SingleOrDefault();

        response.Should().Be204NoContent();
        deletedRecipe.Should().BeNull();
      }
      finally
      {
        // Re-add the delete record as a way to reset the state.
        // We can't use rollback be
        context.Recipes.Add(recipe);
        context.SaveChanges();
      }
    }
  }
}
