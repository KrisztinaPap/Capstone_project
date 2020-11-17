using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Api.Controllers;
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

  [Table("Recipes")]
  public class Recipe {

    [Key]
    [Column(TypeName = "int")]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; private set; }

    [Required]
    [Column(TypeName = "varchar(50)")]
    public string Name { get; private set; }

    [Required]
    [Column(TypeName = "int(10)")]
    public int Fat { get; set; }
    
    [Required]
    [Column(TypeName = "int(10)")]
    public int Protein { get; set; }
    
    [Required]
    [Column(TypeName = "int(10)")]
    public int Carbohydrates { get; set; }
    
    [Required]
    [Column(TypeName = "int(10)")]
    public int Calories { get; set; }
    
    [Required]
    [Column(TypeName = "json")]
    public JsonObject Instructions { get; set; }
    
    [Column(TypeName = "json")]
    public JsonObject Tags { get; set; }
    
    [Column(TypeName = "varchar(100)")]
    public string Image { get; set; }

    [Required]
    [Column(TypeName = "date")]
    public DateTime date_modified { get; set; }
    
    [Required]
    [Column(TypeName = "date")]
    public DateTime date_created { get; set; }
    
    [Required]
    [Column(TypeName = "decimal(10, 3")]
    public decimal prep_time { get; set; }
    
    [Required]
    [Column(TypeName = "int(10)")]
    public int Servings { get; set; }
    
    [Column(TypeName = "varchar(500)")]
    public string Notes { get; set; }
    
    public Recipe(string name) {
      Name = name;
    }

    // TODO: More investigation, but required by EF
    protected Recipe() {}
  }
}
