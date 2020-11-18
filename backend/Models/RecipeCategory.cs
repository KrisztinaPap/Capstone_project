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

  [Table("RecipeCategories")]
  public class RecipeCategory {

    [Key]
    [Column(TypeName = "int(10)")]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; private set; }
    
    [Required]
    [Column(TypeName = "varchar(50)")]
    public string Name { get; set; }
    
    public virtual ICollection<Recipe> Recipes { get; set; } = new HashSet<Recipe>();

    public RecipeCategory()
    {
    }
  }
}