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
    public int Id { get; private set; }
    
    [Required]
    [Column(TypeName = "varchar(50)")]
    public string name { get; set; }
    
    [Required]    
    [Column(TypeName = "varchar(50)")]
    public string password { get; set; }
    
    [Required]    
    [Column(TypeName = "varchar(50)")]
    public string password_salt { get; set; }

    [Required] 
    [Column(TypeName = "varchar(50)")]
    public string email { get; set; }

  }
}