using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models
{
  public class SchedulePlan {
    public DateTime Day { get; set;}

    public ICollection<ScheduleMeal> Meals { get; private set; }

    public SchedulePlan() {
      Meals = new HashSet<ScheduleMeal>();
    }
  }
}
