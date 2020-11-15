using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using FluentValidation;

namespace Api.Models
{
  public class RecipeValidator : AbstractValidator<Recipe> {
    public RecipeValidator() {
      RuleFor(recipe => recipe.Name)
        .NotEmpty()
        .Length(3, 30);

      RuleFor(recipe => recipe.Fat)
        .GreaterThanOrEqualTo(0);
    }
  }

  public class Recipe {

    public int Id { get; private set; }

    public string Name { get; set; }

    public int Fat { get; set; }

    public Recipe(string name) {
      Name = name;
    }

    protected Recipe() {}
  }
}
