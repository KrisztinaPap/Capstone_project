using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Models
{

  [Table("Plan")]
  public class Plan {

    [Key]
    [Column(TypeName = "int(10)")]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    
    [Required]
    [Column(TypeName = "varchar(50)")]
    public int UserId { get; set; }
    
    [Column(TypeName = "date")]
    public DateTime Day { get; set; }

    public virtual ICollection<Meal> Meals { get; set; } = new HashSet<Meal>();

    public Plan()
    {
    }
  }
}
