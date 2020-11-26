using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using FluentValidation;
using Microsoft.AspNetCore.Identity;

namespace Api.Models
{

  [Table("Users")]
  public class User : IdentityUser
  {
    [Required]
    [Column(TypeName = "varchar(50)")]
    public string Name { get; set; }

    public User()
    {
    }
  }
}
