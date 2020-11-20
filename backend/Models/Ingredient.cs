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

  public class IngredientValidator : AbstractValidator<Ingredient> {
    public IngredientValidator() {
      RuleFor(x => x.UOMId)
        .NotEmpty()
        .Length(1, 50);

      RuleFor(x => x.Name)
        .NotEmpty()
        .Length(3, 50);

      RuleFor(x => x.Quantity)
        .GreaterThanOrEqualTo(0)
        .LessThanOrEqualTo(100000);

      RuleSet("Create", CreateRules);
      RuleSet("Update", UpdateRules);
    }

    private void CreateRules() {
      RuleFor(x => x.UOMId)
        .NotEmpty()
        .WithMessage("UOM Must be Selected");

      RuleFor(x => x.Name)
        .NotEmpty()
        .WithMessage("Name field must not be empty");
    }

    private void UpdateRules() {
      RuleFor(x => x.Id)
        .NotEqual(0);
    }
  }


  [Table("Ingredients")]
  public class Ingredient {

    [Key]
    [Column(TypeName = "int(10)")]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [Column(TypeName = "int(10)")]
    public int RecipeId { get; set; }

    [Required]
    [Column(TypeName = "varchar(30)")]
    public string UOMId { get; set; }

    [Required]
    [Column(TypeName = "varchar(50)")]
    public string Name { get; set; }

    [Required]
    [Column(TypeName = "decimal(10, 3)")]
    public decimal Quantity { get; set; }

    public virtual UOM UOM { get; set; }

    public Ingredient()
    {
    }

  }
}
