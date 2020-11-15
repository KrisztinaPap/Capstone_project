using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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

  [Table("Recipies")]
  public class Recipe {

    [Key]
    [Column(TypeName = "int")]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; private set; }

    [Column(TypeName = "varchar(30)")]
    public string Name { get; private set; }

    [Column(TypeName = "int(10)")]
    public int Fat { get; set; }

    public Recipe(string name) {
      Name = name;
    }

    // TODO: More investigation, but required by EF
    protected Recipe() {}
  }
}
