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
    [Column(TypeName = "int(10)")]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    
    [Column(TypeName = "int(10)")]
    public int CategoryId { get; set; }

    [Required]
    [Column(TypeName = "varchar(50)")]
    public string Name { get; set; }

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
    [Column(TypeName = "longtext")]
    public string Instructions { get; set; }
    
    [Column(TypeName = "json")]
    public List<string> Tags { get; set; }
    
    [Column(TypeName = "varchar(100)")]
    public string Image { get; set; }

    [Required]
    [Column(TypeName = "date")]
    public DateTime DateModified { get; set; }
    
    [Required]
    [Column(TypeName = "date")]
    public DateTime DateCreated { get; set; }
    
    [Required]
    [Column(TypeName = "decimal(10, 3)")]
    public decimal PrepTime { get; set; }
    
    [Required]
    [Column(TypeName = "int(10)")]
    public int Servings { get; set; }
    
    [Column(TypeName = "varchar(500)")]
    public string Notes { get; set; }
    
    public Recipe(string name) {
      Name = name;
    }

    // TODO: More investigation, but required by EF
    //protected Recipe() {}

    
    public virtual ICollection<Ingredient> Ingredients { get; private set; } = new HashSet<Ingredient>();
    
    public virtual ICollection<MealRecipe> MealRecipes { get; set; } = new HashSet<MealRecipe>();
    
    public virtual RecipeCategory RecipeCategory { get; set; }

    public Recipe()
    {
    }
  }
}
