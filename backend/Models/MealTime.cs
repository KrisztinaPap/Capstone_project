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

  [Table("MealTime")]
  public class MealTime {

    [Key]
    [Column(TypeName = "varchar(10)")]
    public string Id { get; set; }

    [Column(TypeName = "varchar(30)")]
    public string Name { get; set; }
    
  }
}