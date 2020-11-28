using System.Net.Http;
using Xunit;
using FluentAssertions;

using Api.Models;


namespace Api.Tests.Integration.RecipeControllerTests
{
  [Collection("Integration")]
  public class CreateTests
    : IClassFixture<ApplicationFactory<Startup>>
  {
    private const int TestCategory = -1;
    private const string TestInstructions = "1. Throw all ingredients in a bowl & mix";

    private readonly HttpClient client;

    public CreateTests(ApplicationFactory<Startup> factory) {
      client = factory.CreateClient();
    }

    [Fact]
    [AutoRollback]
    public async void Ensure_AtLeastOneIngredient()
    {
      var body = new {
        Name = "Chicken and Potatoes with Hot Sauce",
        Category = TestCategory,
        Instructions = TestInstructions,
        Servings = 2
      };

      var response = await client.PostAsync("/api/recipes",
        HttpHelper.AsStringContent(body)
      );

      response.Should().Be400BadRequest()
        .And.HaveError("ingredients", "*must not be empty*");
    }

    [Fact]
    [AutoRollback]
    public async void Ensure_IngredientsDontHaveId()
    {
      var body = new {
        Name = "Test Recipe",
        Category = TestCategory,
        Instructions = TestInstructions,
        Servings = 2,
        Ingredients = new[] {
          new {
            Id = -1,
            Name = "Chicken Breast",
            Quantity = 3,
            UOM = "lb",
          },
        }
      };

      var response = await client.PostAsync("/api/recipes",
        HttpHelper.AsStringContent(body)
      );

      response.Should().Be400BadRequest()
        .And.HaveErrorMessage("Cannot set * id on creation");
    }

    [Fact]
    [AutoRollback]
    public async void Ensure_MacrosAreGreaterThan0()
    {
      var body = new {
        Name = "Test Recipe",
        Category = TestCategory,
        Instructions = TestInstructions,
        Servings = 1,
        Fat = -1,
        Calories = -1,
        Protein = -1,
        Carbohydrates = -1,
        Ingredients = new[] {
          new {
            Name = "Chicken Breast",
            Quantity = 3,
            UOM = "lb",
          },
        }
      };

      var response = await client.PostAsync("/api/recipes",
        HttpHelper.AsStringContent(body)
      );

      response.Should().Be400BadRequest()
        .And.HaveError("Fat","*greater than or equal to '0'*")
        .And.HaveError("Protein","*greater than or equal to '0'*")
        .And.HaveError("Calories","*greater than or equal to '0'*")
        .And.HaveError("Carbohydrates","*greater than or equal to '0'*");
    }

    [Fact]
    [AutoRollback]
    public async void Ensure_ServingsDefaultsTo1()
    {
      var body = new {
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

      var response = await client.PostAsync("/api/recipes",
        HttpHelper.AsStringContent(body)
      );

      response.Should().Be201Created()
        .And.Satisfy<Recipe>(model => {
          model.Should().NotBeNull();
          model.Id.Should().BeGreaterThan(0);
          model.Servings.Should().Be(1);
        });
    }


    [Fact]
    [AutoRollback]
    public async void Ensure_IngredientIdsAreNotSet()
    {
      var body = new {
        Name = "Test Recipe",
        Category = TestCategory,
        Instructions = TestInstructions,
        Ingredients = new[] {
          new {
            RecipeId = -1,
            Name = "Chicken Breast",
            Quantity = 3,
            UOM = "lb",
          },
        }
      };

      var response = await client.PostAsync("/api/recipes",
        HttpHelper.AsStringContent(body)
      );

      response.Should().Be400BadRequest()
        .And.HaveErrorMessage("*ids cannot be set*");
    }
  }
}
