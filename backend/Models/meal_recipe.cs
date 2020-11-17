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

  [Table("meals_recipes")]
  public class meal_recipe {

    [Column(TypeName = "int(10)")]
    public int meal_id { get; private set; }
    
    [Column(TypeName = "int(10)")]
    public int recipe_id { get; private set; }
  }
}