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

  [Table("MealsRecipes")]
  public class MealRecipe
  {

    [Column(TypeName = "int(10)")] public int MealId { get; private set; }

    [Column(TypeName = "int(10)")] public int RecipeId { get; private set; }

    public virtual Meal Meal { get; set; }
    public virtual Recipe Recipe { get; set; }

    public MealRecipe()
    {
    }
  }
}