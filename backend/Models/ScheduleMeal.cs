using System.Collections.Generic;

namespace Api.Models {
    public class ScheduleMeal {
    public string MealTime { get; set; }
    public ICollection<int> Recipes { get; private set; }

    public ScheduleMeal() {
      Recipes = new HashSet<int>();
    }
  }

}
