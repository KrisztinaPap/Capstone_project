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

namespace Api.Tests.Integration.RecipeControllerTests
{
  [Collection("Integration")]
  public class GeneralTests
    : IClassFixture<ApplicationFactory<Startup>>
  {
    private readonly HttpClient client;

    public GeneralTests(ApplicationFactory<Startup> factory) {
      client = factory.CreateClient();
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
  }
}
