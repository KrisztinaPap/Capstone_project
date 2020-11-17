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

  [Table("UOM")]
  public class UOM {

    // This is a shortname (g, c, p, f, kcal, etc)
    [Key]
    [Column(TypeName = "varchar(20)")]
    public string Id { get; private set; }
    
    [Required]
    [Column(TypeName = "varchar(50)")]
    public string Name { get; set; }
  }
}