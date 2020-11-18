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

  [Table("Users")]
  public class User {

    [Key]
    [Column(TypeName = "int(10)")]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    
    [Required]
    [Column(TypeName = "varchar(50)")]
    public string Name { get; set; }
    
    [Required]    
    [Column(TypeName = "varchar(50)")]
    public string Password { get; set; }
    
    [Required]    
    [Column(TypeName = "varchar(50)")]
    public string PasswordSalt { get; set; }

    [Required] 
    [Column(TypeName = "varchar(50)")]
    public string Email { get; set; }

    public User()
    {
    }

  }
}