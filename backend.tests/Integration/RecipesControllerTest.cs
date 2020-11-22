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
    public async void Recipes_Returns_Array_Of_Recipes()
    {
      var response = await client.GetAsync("/api/recipes/");

      response.EnsureSuccessStatusCode();
      var result = await response.Content.ReadAsStringAsync();

      var json = JArray.Parse(result);

      Assert.True(json.Count >= 5);
    }
  }
}
