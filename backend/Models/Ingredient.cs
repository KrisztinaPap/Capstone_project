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

  [Table("Ingredients")]
  public class Ingredient {

    [Key]
    [Column(TypeName = "int(10)")]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; private set; }
    
    [Required]
    [Column(TypeName = "int(10)")]
    public int RecipeId { get; set; }
    
    [Required]    
    [Column(TypeName = "varchar(30)")]
    public string UOM { get; set; }
    
    [Required]
    [Column(TypeName = "varchar(50)")]
    public string Name { get; set; }
    
    [Required]
    [Column(TypeName = "decimal(10)")]
    public decimal Quantity { get; set; }
  }
}
