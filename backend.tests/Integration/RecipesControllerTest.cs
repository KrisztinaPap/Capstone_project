using System;
using System.Linq;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Newtonsoft.Json.Linq;
using Xunit;

using Api;
using Api.Models;
using Api.Controllers;

namespace Api.Tests.Integration
{
  [Collection("Integration")]
  public class RecipesControllerTest
    : IClassFixture<ApplicationFactory<Startup>>
  {
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

      response.EnsureSuccessStatusCode();
      var result = await response.Content.ReadAsStringAsync();

      var json = JArray.Parse(result);

      Assert.True(json.Count >= 5);
    }


    [Fact]
    public async void Show_Returns_ValidRecipe()
    {
      var expected = JObject.Parse("{\"id\":-1,\"category\":-1,\"name\":\"Chicken and Potatoes with Hot Sauce\",\"fat\":30,\"protein\":70,\"carbohydrates\":100,\"calories\":860,\"instructions\":\"* Cook Chicken\n                * Cook Potatoes\n                * Smother in Hot Sauce\",\"tags\":[\"Spicy\"],\"image\":null,\"dateModified\":\"2020-11-19T00:00:00\",\"dateCreated\":\"2020-11-19T00:00:00\",\"prepTime\":35.000,\"servings\":2,\"notes\":\"* Marinate Chicken for at least 12 hours for maximum flavor\",\"ingredients\":[{\"id\":-3,\"recipeId\":-1,\"uom\":\"ea\",\"name\":\"Poatato\",\"quantity\":4.000},{\"id\":-2,\"recipeId\":-1,\"uom\":\"cup\",\"name\":\"Hot Sauce\",\"quantity\":1.000},{\"id\":-1,\"recipeId\":-1,\"uom\":\"lb\",\"name\":\"Chicken Breast\",\"quantity\":3.000}]}");

      var response = await client.GetAsync("/api/recipes/-1");

      response.EnsureSuccessStatusCode();
      var result = await response.Content.ReadAsStringAsync();

      var json = JObject.Parse(result);

      Assert.Equal(expected, json);
    }
  }
}
