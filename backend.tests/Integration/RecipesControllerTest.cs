using System;
using System.Text;
using System.Net;
using System.Linq;
using System.Net.Http;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Xunit;
using FluentAssertions;
using FluentAssertions.Web;

using Api;
using Api.Models;
using Api.Controllers;

namespace Api.Tests.Integration
{
  [Collection("Integration")]
  public class RecipesControllerTest
    : IClassFixture<ApplicationFactory<Startup>>
  {
    private const int TestCategory = -1;
    private const string TestInstructions = "1. Throw all ingredients in a bowl & mix";

    private readonly HttpClient client;
    private readonly ApplicationFactory<Startup> _factory;

    public RecipesControllerTest(ApplicationFactory<Startup> factory) {
      client = factory.CreateClient();
      _factory = factory;
    }

    [Fact]
    public async void Index_Returns_Array_Of_Recipes()
    {
      var response = await client.GetAsync("/api/recipes/");

      response.Should().Be200Ok().And.Satisfy<IReadOnlyCollection<Recipe>>(
        model => {
          model.Should().HaveCountGreaterOrEqualTo(5);
          model.Should().OnlyHaveUniqueItems(x => x.Id);
        }
      );
    }

    [Fact]
    public async void Get_Returns_ValidRecipe()
    {
      var response = await client.GetAsync("/api/recipes/-1");

      response.Should().Be200Ok()
        .And.Satisfy<Recipe>(model => {
          model.Should().NotBeNull();
          model.Id.Should().Be(-1);
        });
    }

    [Fact]
    [AutoRollback]
    public async void Create_Ensure_AtLeastOneIngredient()
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
    public async void Create_Ensure_IngredientsDontHaveId()
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
  }
}
