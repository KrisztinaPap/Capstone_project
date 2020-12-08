using System;
using System.Collections.Generic;
using Api.Models;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Linq;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Api.Authentication;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace Api.Models
{
  public class DBContext : IdentityDbContext<User>
  {
    public virtual DbSet<Recipe> Recipes { get; set; }

    public virtual DbSet<Plan> Plans { get; set; }

    public virtual DbSet<Ingredient> Ingredients { get; set; }

    public virtual DbSet<UOM> UOMs { get; set; }

    public virtual DbSet<RecipeCategory> RecipeCategories { get; set; }

    public virtual DbSet<Meal> Meals { get; set; }

    public virtual DbSet<MealTime> MealTimes { get; set; }

    public virtual DbSet<MealRecipe> MealRecipes { get; set; }

    public DBContext(DbContextOptions<DBContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      string userId = "927249ee-afd9-4bd0-b74e62053687d989";
      DateTime anchorDate = new DateTime(2020, 12, 9);

      base.OnModelCreating(modelBuilder);
      modelBuilder.Entity<Recipe>(entity =>
      {
        entity.HasMany(a => a.Ingredients)
          .WithOne()
          .HasForeignKey(key => key.RecipeId)
          .OnDelete(DeleteBehavior.Cascade);

        entity.Property(e => e.Image)
          .HasDefaultValue(string.Empty);

        entity.HasData(
          new Recipe()
          {
            Id = -1,
            CategoryId = -1,
            UserId = userId,
            Name = "Chicken and Potatoes with Hot Sauce",
            Fat = 30,
            Protein = 70,
            Carbohydrates = 100,
            Instructions = string.Join("\n",
              "1. Season Chicken with any desired spices",
              "2. Cook Chicken",
              "3. Cook Potatoes",
              "4. Smother in Hot Sauce"
            ),
            Image = $"images/User_{userId}/chicken-potato-hotsauce.jpg",
            DateModified = DateTime.Today,
            DateCreated = DateTime.Today,
            PrepTime = 35,
            CookTime = 30,
            Servings = 2,
            Notes = string.Join("\n",
              "* Marinate Chicken for at least 12 hours for maximum flavor"
              )
          },
          new Recipe()
          {
            Id = -2,
            CategoryId = -2,
            UserId = userId,
            Name = "Steak and Sweet Potatoes",
            Fat = 10,
            Protein = 70,
            Carbohydrates = 115,
            Instructions = string.Join("\n",
              "1. Cook Steak on BBQ",
              "2. Cook Potatoes to personal preference",
              "3. Serve and Enjoy!"
            ),
            Image = $"images/User_{userId}/steak-sweet-potato.jpeg",
            DateModified = DateTime.Today,
            DateCreated = DateTime.Today,
            PrepTime = 25,
            CookTime = 20,
            Servings = 2,
            Notes = string.Join("\n",
              "* Marinate Steak for at least 12 hours for maximum flavor",
              "* Can be cooked on the stovetop but is better when BBQ'd",
              "* Potatoes can be diced, sliced, or baked. Personal preference."
            )
          },
          new Recipe()
          {
            Id = -3,
            CategoryId = -1,
            UserId = userId,
            Name = "Butter Chicken",
            Fat = 11,
            Protein = 20,
            Carbohydrates = 10,
            Instructions = string.Join("\n",
            "1. Place the olive oil, garlic, chilies, onion, and ginger in a blender and purée until smooth.",
            "2. Heat ghee in a large dutch oven over medium-high. Add the onion purée and cook until the mixture darkens slightly and softens, about 15 minutes.",
            "3. Add the tomato paste, turmeric, chili powder, garam masala, coriander, and cumin and cook for 5 minutes, or until dark and sticky.",
            "4. Add in 1 1/2 cups water. Using a wooden spoon, scrape up any browned bits at the bottom of the pan.",
            "5. Stir in the tomato puree and fenugreek leaves and increase the heat to high. Bring to a boil, then reduce the heat to maintain a simmer. Cover and cook, stirring occasionally, until thick, about 1 hour. Add the chicken and cook until the chicken is cooked through, about 15 minutes more.",
            "6. Add the cream and butter and stir to combine. Season with salt and serve garnished with fresh cilantro with steamed Jasmine rice."
            ),
            Image = $"images/User_{userId}/butter-chicken.jpg",
            DateModified = DateTime.Today,
            DateCreated = DateTime.Today,
            PrepTime = 65,
            CookTime = 40,
            Servings = 8,
            Notes = string.Join("\n",
              "* Delicious!"
            )
          },
          new Recipe()
          {
            Id = -4,
            CategoryId = -4,
            UserId = userId,
            Name = "Black Bean Quesadillas",
            Fat = 16,
            Protein = 13,
            Carbohydrates = 45,
            Instructions = string.Join("\n",
              "1. Combine beans, cheese and 1/4 cup salsa in a medium bowl.",
            "2. Place tortillas on a work surface.",
            "3. Spread 1/2 cup filling on half of each tortilla.",
            "4. Fold tortillas in half, pressing gently to flatten.",
            "5. Heat 1 teaspoon oil in a large nonstick skillet over medium heat.",
            "6. Add 2 quesadillas and cook, turning once, until golden on both sides, 2 to 4 minutes total.",
            "7. Transfer to a cutting board and tent with foil to keep warm. Repeat with the remaining 1 teaspoon oil and quesadillas.",
            "8. Serve the quesadillas with avocado and the remaining salsa."
            ),
            Image = $"images/User_{userId}/blackbean-quesadilla.jpg",
            DateModified = DateTime.Today,
            DateCreated = DateTime.Today,
            PrepTime = 25,
            CookTime = 5,
            Servings = 4,
            Notes = string.Join("\n",
              "Tip: Look for prepared fresh salsa in the supermarket refrigerator section near other dips and spreads.")
          },
          new Recipe()
          {
            Id = -5,
            CategoryId = -1,
            UserId = userId,
            Name = "Chipotle and Orange Grilled Chicken",
            Fat = 3,
            Protein = 23,
            Carbohydrates = 6,
            Instructions = string.Join("\n",
              "1. Preheat grill or broiler.",
            "2. Whisk together orange-juice concentrate, chipotle pepper, vinegar, molasses and mustard in a small bowl.",
            "3. Lightly oil the grill or broiler rack (see Tip).",
            "4. Season chicken with salt and grill or broil for 2 minutes.",
            "5. Turn, brush with the glaze and cook for 4 minutes, brushing occasionally with glaze.",
            "6. Turn again, brush with the glaze, and cook until the center is no longer pink, 1 to 2 minutes longer."
            ),
            Image = $"images/User_{userId}/chipotle-orange-chicken.jpg",
            DateModified = DateTime.Today,
            DateCreated = DateTime.Today,
            PrepTime = 45,
            CookTime = 15,
            Servings = 4,
            Notes = string.Join("\n",
              "* Chipotle chiles in adobo sauce are smoked jalapeños packed in a flavorful sauce.",
            "* Look for the small cans with the Mexican foods in large supermarkets.",
            "* Once opened, they'll keep up to 2 weeks in the refrigerator or 6 months in the freezer.",
            "* Tip: To oil a grill rack: Oil a folded paper towel, hold it with tongs and rub it over the rack. (Do not use cooking spray on a hot grill.)",
            "* When grilling delicate foods like tofu and fish, it is helpful to spray the food with cooking spray.")
          },
          new Recipe()
          {
            Id = -6,
            CategoryId = -3,
            UserId = userId,
            Name = "Brazilian Fish Stew (Moqueca)",
            Fat = 20,
            Protein = 45,
            Carbohydrates = 13,
            Instructions = string.Join("\n",
              "1. Rinse and pat dry the fish and cut into 2 inch peices. Place in a bowl. Add salt, zest from half the lime and 1 tablespoon lime juice. Massage lightly to coat all pieces well. Set aside.",
              "2. In a large saute pan, heat the olive oil over medium high heat. Add onion and salt, and sauté 2-3 minutes. Turn heat down to medium, add carrot, bell pepper, garlic and jalapeno and cook 4-5 more minutes. Add tomato paste, spices and stock. Mix and bring to a simmer and add tomatoes. Cover and simmer gently on medium low for 5 mintues or until carrots are tender.",
              "3. Add the coconut milk and taste and add more salt if necessary.",
              "4. Nestle the fish in the stew and simmer gently until it’s cooked through, about 4-6 minutes.  Spoon the flavorful coconut broth over the fish and cook until desired doneness or longer for thicker pieces. ( You can also finish this in a 350F oven).",
              "5. Taste and adjust salt and squeeze with lime.",
              "6. To serve, serve over rice, sprinkle with cilantro or scallions and a squeeze of lime.",
              "7. (Optional) Drizzle with a little olive oil to taste."
            ),
            Image = $"images/User_{userId}/braz-fish-stew.jpg",
            DateModified = DateTime.Today,
            DateCreated = DateTime.Today,
            PrepTime = 30,
            CookTime = 45,
            Servings = 4,
            Notes = string.Join("\n",
              "* Serve with rice or crusty bread to mop up all the juices",
              "* Look for Coconut Milk in a can at the supermarket",
              "* Fresh Tomatoes make the recipe better than Canned Tomato",
              "* Cumin can be substituted for whole seed cumin")
          },
          new Recipe()
          {
            Id = -7,
            CategoryId = -3,
            UserId = userId,
            Name = "Simple Salmon Chowder",
            Fat = 12,
            Protein = 25,
            Carbohydrates = 21,
            Instructions = string.Join("\n",
              "1. Heat oil over medium heat, and saute onion, fennel and celery until fragrant, 5-6 minutes. Add garlic, fennel seeds, thyme and saute two more minutes, stirring. Add the smoked paprika.",
              "2. Add vermouth, and cook it off, about 1-2 minutes. Add stock, salt, thyme and bay, and bring to a simmer over high heat. Add potatoes and stir. Bring to a simmer, cover and simmer over med-low heat until tender, about 8-10 minutes (check at 7 mins, be careful to not overcook).  While this is cooking prep the salmon.",
              "3. Cut salmon into 2-inch pieces, removing any of the brown fat ( see notes) and bones. Sprinkle lightly with salt.",
              "4. Once the potatoes are just fork-tender, add the milk and bring to a low simmer (do not boil) and add the salmon, gently poaching it in the soup for just about  2 minutes. Turn heat off.  Fish will continue to cook. If you continue to simmer the soup any longer it may cause a slight curdling. ( Don’t worry, it’s still edible, but not as pretty.)  Flake the fish apart, into bite-sized pieces, with a fork.",
              "5. Taste, adjust seasonings to your liking and serve immediately.",
              "6. Garnish with fennel fronds, lemon wedges, fresh dill or tarragon."
            ),
            Image = $"images/User_{userId}/simple-salmon-chowder.jpg",
            DateModified = DateTime.Today,
            DateCreated = DateTime.Today,
            PrepTime = 20,
            CookTime = 20,
            Servings = 6,
            Notes = string.Join("\n",
              "* If using chicken stock, add 1 teaspoon fish sauce for depth. You can also sub some clam juice for the stock.",
              "* If skipping the vermouth or sherry cooking wine, which FYI does give this a lovely elevated nuanced flavor, add a couple of drops of AC vinegar at the end along with a pinch of sugar. Advanced cooks- you could experiment with Pernod (subbing it for the vermouth, starting with 2-3 tablespoons, making sure to cook this off) which will give it a beautiful anise flavor.",
              "* If you notice grey/brown fat located between the skin and salmon flesh, feel free to remove it -which ultimately will look better in the stew. If using wild salmon, it is ok to eat (healthy, actually)  just not quite as “pretty”.",
              "* Keto option, sub potatoes with cauliflower. Use 1 cup of heavy whipping cream.",
              "* Dairy-Free option: Add 1 cup of coconut milk, more to taste.",
              "* Soup will keep 3 days in the fridge.",
              "* Salmon can be substituted for Cod or Shrimp. Cut in to 1-2 inch pieces",
              "* Garnish with Lemon Wedges, Fresh Dill, Tarragon, and Fennel Fronds if you desire.")
          },
          new Recipe()
          {
            Id = -8,
            CategoryId = -2,
            UserId = userId,
            Name = "Easy Mongolian Beef",
            Fat = 12,
            Protein = 25,
            Carbohydrates = 21,
            Instructions = string.Join("\n",
              "1. Slice the flank steak against the grain (the grain is the length of the steak) the long way 1/4 inch think pieces and add it to a ziploc bag with the cornstarch.",
              "2. Press the steak around in the bag making sure each piece is fully coated with cornstarch and leave it to sit.",
              "3. Add the canola oil to a large frying pan and heat on medium high heat.",
              "4. Add the steak, shaking off any excess corn starch, to the pan in a single layer and cook on each side for 1 minute.",
              "5. If you need to cook the steak in batches because your pan isn't big enough do that rather than crowding the pan, you want to get a good sear on the steak and if you crowd the pan your steak with steam instead of sear.",
              "6. When the steak is done cooking remove it from the pan.",
              "7. Add the ginger and garlic to the pan and saute for 10-15 seconds",
              "8. Add the soy sauce, water, and dark brown sugar to the pan and let it come to a boil",
              "9. Add the steak back in and let the sauce thicken for 20-30 seconds",
              "10. The cornstarch we used on the steak should thicken the sauce, if you find it isn't thickening enough, add 1 tablespoon of cornstarch to 1 tablespoon of cold water and stir to dissolve the cornstarch and add it to the pan.",
              "11. Add the green onions, stir to combine everything, and cook for a final 20-30 seconds",
              "12. Serve immediately."
            ),
            Image = $"images/User_{userId}/mongolian-beef.jpg",
            DateModified = DateTime.Today,
            DateCreated = DateTime.Today,
            PrepTime = 10,
            CookTime = 15,
            Servings = 4,
            Notes = string.Join("\n",
              "* Mongolian Beef that's easy to make in just 30 minutes, crispy, sweet and full of garlic and ginger flavors you love from your favorite Chinese restaurant.")
          },
            new Recipe()
          {
            Id = -9,
            CategoryId = -5,
            UserId = userId,
            Name = "Vegan Fajitas",
            Fat = 29,
            Protein = 18,
            Carbohydrates = 78,
            Instructions = string.Join("\n",
              "1. Preheat the oven to 425 degrees Fahrenheit.",
              "2. Thinly slice the onion. Slice the bell peppers. Chop the cauliflower into small florets. Chop the mushroom into bite-sized pieces. Add the veggies to a big bowl and toss them with the olive oil, chili powder, cumin, paprika, garlic powder, onion powder, and kosher salt.",
              "3. Line 2 baking sheets with parchment paper. Add the vegetables in a single layer. Roast 15 minutes, then remove the sheets, stir the veggies, and sprinkle on another 1/2 teaspoon salt spread between the trays (1/4 teaspoon on each). Stir again, then return to the oven and roast another 10 minutes until tender.",
              "4. Meanwhile, pit the avocados. Scoop out the flesh into a bowl and mash with a fork. Add the lime juice, salt, and cilantro.",
              "5. Heat the refried beans in a small sauce pan.",
              "6. If desired, char the tortillas by placing them on an open gas flame on medium for a few seconds per side, flipping with tongs, until they are slightly blackened and warm.",
              "7. To serve, place the refried beans and roasted veggies in tortillas, and top with guac-ish."
            ),
            Image = $"images/User_{userId}/vegan-fajitas.jpg",
            DateModified = DateTime.Today,
            DateCreated = DateTime.Today,
            PrepTime = 15,
            CookTime = 25,
            Servings = 4,
            Notes = string.Join("\n",
              "* Guacish is made by pitting 2 avocados, mashing them in a bowl, and adding the juice of 1 lime and chopped cilantro to taste.",
              "* For best results, warm tortillas in the oven - Heat oven to 350 degrees and wrap tortillas 4 at a time in aluminum foil and cook for 15-20 minutes",
              "* Homemade refried beans are great if you have time to whip them up, otherwise canned vegetarian refried beans are available at most supermarkets.",
              "* If using canned refried beans may need some additional cumin or chilli powder to add taste.")
          },
            new Recipe()
          {
            Id = -10,
            CategoryId = -4,
            UserId = userId,
            Name = "5 Minute Vegetarian Egg Tacos",
            Fat = 15,
            Protein = 16,
            Carbohydrates = 26,
            Instructions = string.Join("\n",
              "1. In a medium bowl, whisk together the 4 eggs. Add the chili powder, garlic powder, cumin, and kosher salt, and whisk until combined",
              "2. In a skillet, heat the olive oil. Add the eggs and cook over medium low heat, scraping as the eggs solidify, about 3 to 4 minutes total. As you scrape, they’ll start to form together into a meat-like texture. Don’t scrape too much or you’ll make too small of pieces: just enough for that it comes together!",
              "3. If time, warm and char the tortillas by placing them on an open gas flame on medium for a few seconds per side, flipping with tongs, until they are slightly blackened and warm.",
              "4. Top with salsa fresca (drain extra liquid before serving), thin sliced red onions, torn cilantro leaves, and hot sauce."
             ),
            Image = $"images/User_{userId}/vegetarian-egg-tacos.jpg",
            DateModified = DateTime.Today,
            DateCreated = DateTime.Today,
            PrepTime = 2,
            CookTime = 3,
            Servings = 2,
            Notes = string.Join("\n",
              "* Great Toppings Include: Salsa or Pico de Gallo, Red Onion, Cilantro, Lettuce, Sour Cream, Jalapeno, and Crema.",
              "* Dont scrape the pan too much! You don't want tiny bits of eggs, you'll want it to hold together into a cohesive texture",
              "* Cook over low medium heat. Don't have the heat too high! This can burn the eggs!",
              "* This quick recipe makes for a great speedy breakfast for those on the go!")
          }
        );
      });

      modelBuilder.Entity<MealRecipe>(entity =>
      {
        // Making composite key
        // https://www.learnentityframeworkcore.com/configuration/many-to-many-relationship-configuration
        entity.HasKey(x => new {x.MealId, x.RecipeId});

        entity.HasOne(a => a.Meal)
          .WithMany(b => b.MealRecipes)
          .HasForeignKey(c => c.MealId)
          .OnDelete(DeleteBehavior.Cascade);

        entity.HasOne(a => a.Recipe)
          .WithMany(b => b.MealRecipes)
          .HasForeignKey(c => c.RecipeId)
          .OnDelete(DeleteBehavior.Cascade);

        entity.HasData(
          new MealRecipe()
          {
            MealId = -1,
            RecipeId = -1
          },
          new MealRecipe()
          {
            MealId = -2,
            RecipeId = -2
          }
        );
      });

      modelBuilder.Entity<Plan>(entity =>
      {
        entity.HasMany(a => a.Meals)
          .WithOne()
          .HasForeignKey(b => b.PlanId)
          .OnDelete(DeleteBehavior.Cascade);

        entity.HasData(
          new Plan()
          {
            Id = -1,
            UserId = userId,
            Day = anchorDate
          }
        );
      });

      modelBuilder.Entity<Meal>(entity =>
      {
        entity.HasOne(a => a.MealTime)
          .WithMany()
          .HasForeignKey(b => b.MealTimeId)
          .OnDelete(DeleteBehavior.Restrict);

        entity.HasData(
          new Meal()
          {
            Id = -1,
            PlanId = -1,
            MealTimeId = -2
          },
          new Meal()
          {
            Id = -2,
            PlanId = -1,
            MealTimeId = -3
          }
        );
      });

      modelBuilder.Entity<RecipeCategory>(entity =>
      {
        entity.HasMany(a => a.Recipes)
          .WithOne(b => b.RecipeCategory)
          .HasForeignKey(c => c.CategoryId)
          .OnDelete(DeleteBehavior.Restrict);

        entity.HasData(
          new RecipeCategory()
          {
            Id = -1,
            Name = "Chicken"
          },
          new RecipeCategory()
          {
            Id = -2,
            Name = "Beef"
          },
          new RecipeCategory()
          {
            Id = -3,
            Name = "Fish"
          },
          new RecipeCategory()
          {
            Id = -4,
            Name = "Vegetarian"
          },
          new RecipeCategory()
          {
            Id = -5,
            Name = "Vegan"
          }
        );
      });

      modelBuilder.Entity<Ingredient>(entity =>
      {
        entity.HasOne(a => a.UOM)
          .WithMany()
          .HasForeignKey(c => c.UOMId)
          .OnDelete(DeleteBehavior.Restrict);

        entity.HasData(
          new Ingredient()
          {
            Id = -1,
            RecipeId = -1,
            Name = "Chicken Breast",
            Quantity = 3,
            UOMId = "lb",
          },
          new Ingredient()
          {
            Id = -2,
            RecipeId = -1,
            Name = "Hot Sauce",
            Quantity = 1,
            UOMId = "cup"
          },
          new Ingredient()
          {
            Id = -3,
            RecipeId = -1,
            Name = "Potato",
            Quantity = 4,
            UOMId = "ea"
          },
          new Ingredient()
          {
            Id = -7,
            RecipeId = -3,
            Name = "Olive Oil",
            Quantity = 6,
            UOMId = "tbsp"
          },
          new Ingredient()
          {
            Id = -8,
            RecipeId = -3,
            Name = "Garlic cloves",
            Quantity = 5,
            UOMId = "ea"
          },
          new Ingredient()
          {
            Id = -9,
            RecipeId = -3,
            Name = "Yellow onion",
            Quantity = 2,
            UOMId = "ea"
          },
          new Ingredient()
          {
            Id = -10,
            RecipeId = -3,
            Name = "ghee",
            Quantity = 0.5m,
            UOMId = "cup"
          },
          new Ingredient()
          {
            Id = -11,
            RecipeId = -3,
            Name = "Tomato paste",
            Quantity = 3,
            UOMId = "tbsp"
          },
          new Ingredient()
          {
            Id = -12,
            RecipeId = -3,
            Name = "Tumeric",
            Quantity = 3,
            UOMId = "tbsp"
          },
          new Ingredient()
          {
            Id = -13,
            RecipeId = -3,
            Name = "Chili powder",
            Quantity = 2,
            UOMId = "tbsp"
          },
          new Ingredient()
          {
            Id = -14,
            RecipeId = -3,
            Name = "Garam masala",
            Quantity = 2,
            UOMId = "tbsp"
          },
          new Ingredient()
          {
            Id = -15,
            RecipeId = -3,
            Name = "Ground coriander",
            Quantity = 2,
            UOMId = "tbsp"
          },
          new Ingredient()
          {
            Id = -16,
            RecipeId = -3,
            Name = "Ground cumin",
            Quantity = 2,
            UOMId = "tbsp"
          },
          new Ingredient()
          {
            Id = -17,
            RecipeId = -3,
            Name = "Tomato puree",
            Quantity = 3.5m,
            UOMId = "cup"
          },
          new Ingredient()
          {
            Id = -18,
            RecipeId = -3,
            Name = "Chicken Breast",
            Quantity = 4,
            UOMId = "ea"
          },
          new Ingredient()
          {
            Id = -19,
            RecipeId = -3,
            Name = "Heavy Cream",
            Quantity = 2,
            UOMId = "cup"
          },
          new Ingredient()
          {
            Id = -20,
            RecipeId = -3,
            Name = "Unsalted butter",
            Quantity = 8,
            UOMId = "tbsp"
          },
          new Ingredient()
          {
            Id = -21,
            RecipeId = -3,
            Name = "Cooked Jasmine Rice",
            Quantity = 5,
            UOMId = "cup"
          },
          new Ingredient()
          {
            Id = -22,
            RecipeId = -4,
            Name = "Black Beans",
            Quantity = 15,
            UOMId = "oz"
          },
          new Ingredient()
          {
            Id = -23,
            RecipeId = -4,
            Name = "Shredded Monterey Jack Cheese",
            Quantity = 0.5m,
            UOMId = "cup"
          },
          new Ingredient()
          {
            Id = -24,
            RecipeId = -4,
            Name = "Salsa",
            Quantity = 0.5m,
            UOMId = "cup"
          },
          new Ingredient()
          {
            Id = -25,
            RecipeId = -4,
            Name = "Tortillas",
            Quantity = 4,
            UOMId = "ea"
          },
          new Ingredient()
          {
            Id = -26,
            RecipeId = -4,
            Name = "Canola oil",
            Quantity = 2,
            UOMId = "tsp"
          },
          new Ingredient()
          {
            Id = -27,
            RecipeId = -4,
            Name = "Avocado, diced",
            Quantity = 1,
            UOMId = "ea"
          },
          new Ingredient()
          {
            Id = -28,
            RecipeId = -5,
            Name = "Orange juice concentrate",
            Quantity = 2,
            UOMId = "tbsp"
          },
          new Ingredient()
          {
            Id = -29,
            RecipeId = -5,
            Name = "Finely chopped chipotle peppers(See notes)",
            Quantity = 1,
            UOMId = "tbsp"
          },
          new Ingredient()
          {
            Id = -30,
            RecipeId = -5,
            Name = "Balsamic Vinegar",
            Quantity = 1,
            UOMId = "tbsp"
          },
          new Ingredient()
          {
            Id = -31,
            RecipeId = -5,
            Name = "Unsulfured Molasses",
            Quantity = 2,
            UOMId = "tsp"
          },
          new Ingredient()
          {
            Id = -32,
            RecipeId = -5,
            Name = "Dijon mustard",
            Quantity = 1,
            UOMId = "tsp"
          },
          new Ingredient()
          {
            Id = -33,
            RecipeId = -5,
            Name = "Chicken Breast",
            Quantity = 1,
            UOMId = "lb"
          },
          new Ingredient()
          {
            Id = -34,
            RecipeId = -5,
            Name = "Salt",
            Quantity = 1,
            UOMId = "tsp"
          },
          new Ingredient()
          {
            Id = -35,
            RecipeId = -6,
            Name = "Halibut, Black Cod, or Sea Bass",
            Quantity = 1.5m,
            UOMId = "lb"
          },
          new Ingredient()
          {
            Id = -36,
            RecipeId = -6,
            Name = "Salt",
            Quantity = .5m,
            UOMId = "tsp"
          },
          new Ingredient()
          {
            Id = -37,
            RecipeId = -6,
            Name = "Coconut Oil or Olive Oil",
            Quantity = 3,
            UOMId = "tbsp"
          },
          new Ingredient()
          {
            Id = -38,
            RecipeId = -6,
            Name = "Onion - Diced",
            Quantity = 1,
            UOMId = "ea"
          },
          new Ingredient()
          {
            Id = -39,
            RecipeId = -6,
            Name = "Carrot - Diced",
            Quantity = 1,
            UOMId = "cup"
          },
          new Ingredient()
          {
            Id = -40,
            RecipeId = -6,
            Name = "Red Bell Pepper - Diced",
            Quantity = 1,
            UOMId = "ea"
          },
          new Ingredient()
          {
            Id = -41,
            RecipeId = -6,
            Name = "Clove of Garlic - Chopped",
            Quantity = 4,
            UOMId = "ea"
          },
          new Ingredient()
          {
            Id = -42,
            RecipeId = -6,
            Name = "Jalapeno - Diced",
            Quantity = 0.5m,
            UOMId = "ea"
          },
          new Ingredient()
          {
            Id = -43,
            RecipeId = -6,
            Name = "Tomato Paste",
            Quantity = 1,
            UOMId = "tbsp"
          },
          new Ingredient()
          {
            Id = -44,
            RecipeId = -6,
            Name = "Paprika",
            Quantity = 2,
            UOMId = "tsp"
          },
          new Ingredient()
          {
            Id = -45,
            RecipeId = -6,
            Name = "Chicken or Fish Stock",
            Quantity = 1,
            UOMId = "cup"
          },
          new Ingredient()
          {
            Id = -46,
            RecipeId = -6,
            Name = "Diced Tomatoes",
            Quantity = 1.5m,
            UOMId = "cup"
          },
          new Ingredient()
          {
            Id = -47,
            RecipeId = -6,
            Name = "Coconut Milk",
            Quantity = 14,
            UOMId = "oz"
          },
          new Ingredient()
          {
            Id = -48,
            RecipeId = -6,
            Name = "Cilantro - Chopped",
            Quantity = 0.5m,
            UOMId = "cup"
          },
          new Ingredient()
          {
            Id = -49,
            RecipeId = -6,
            Name = "Lime Juice - To Taste",
            Quantity = 1,
            UOMId = "ea"
          },
          new Ingredient()
          {
            Id = -50,
            RecipeId = -7,
            Name = "Olive Oil",
            Quantity = 3,
            UOMId = "tbsp"
          },
          new Ingredient()
          {
            Id = -51,
            RecipeId = -7,
            Name = "Onion - Diced",
            Quantity = 1,
            UOMId = "ea"
          },
          new Ingredient()
          {
            Id = -52,
            RecipeId = -7,
            Name = "Small Fennel Bulb - Diced",
            Quantity = 1.5m,
            UOMId = "cup"
          },
          new Ingredient()
          {
            Id = -53,
            RecipeId = -7,
            Name = "Celery - Sliced",
            Quantity = 1,
            UOMId = "cup"
          },
          new Ingredient()
          {
            Id = -54,
            RecipeId = -7,
            Name = "Garlic Cloves",
            Quantity = 4,
            UOMId = "ea"
          },
          new Ingredient()
          {
            Id = -55,
            RecipeId = -7,
            Name = "Dry Thyme",
            Quantity = 0.5m,
            UOMId = "tsp"
          },
          new Ingredient()
          {
            Id = -56,
            RecipeId = -7,
            Name = "Smoked Paprika",
            Quantity = 0.5m,
            UOMId = "tsp"
          },
          new Ingredient()
          {
            Id = -57,
            RecipeId = -7,
            Name = "Vermouth (Can leave out, see notes)",
            Quantity = 0.33m,
            UOMId = "cup"
          },
          new Ingredient()
          {
            Id = -58,
            RecipeId = -7,
            Name = "Fish or Chicken Stock (See Notes)",
            Quantity = 3,
            UOMId = "cup"
          },
          new Ingredient()
          {
            Id = -59,
            RecipeId = -7,
            Name = "Sliced Baby Potatoes",
            Quantity = 0.75m,
            UOMId = "lb"
          },
          new Ingredient()
          {
            Id = -60,
            RecipeId = -7,
            Name = "Salt",
            Quantity = 1,
            UOMId = "tsp"
          },
          new Ingredient()
          {
            Id = -61,
            RecipeId = -7,
            Name = "Bay Leaf",
            Quantity = 1,
            UOMId = "ea"
          },
          new Ingredient()
          {
            Id = -62,
            RecipeId = -7,
            Name = "Salmon, Skinless (See Notes)",
            Quantity = 1,
            UOMId = "lb"
          },
          new Ingredient()
          {
            Id = -63,
            RecipeId = -7,
            Name = "Milk (See Notes)",
            Quantity = 2,
            UOMId = "cup"
          },
          new Ingredient()
          {
            Id = -64,
            RecipeId = -8,
            Name = "Flank Steak",
            Quantity = 1,
            UOMId = "lb"
          },
          new Ingredient()
          {
            Id = -65,
            RecipeId = -8,
            Name = "Cornstarch",
            Quantity = 0.25m,
            UOMId = "cup"
          },
          new Ingredient()
          {
            Id = -66,
            RecipeId = -8,
            Name = "Canola Oil",
            Quantity = 0.25m,
            UOMId = "cup"
          },
          new Ingredient()
          {
            Id = -67,
            RecipeId = -8,
            Name = "Fresh Minced Ginger",
            Quantity = 2,
            UOMId = "tsp"
          },
          new Ingredient()
          {
            Id = -68,
            RecipeId = -8,
            Name = "Minced Garlic",
            Quantity = 1,
            UOMId = "tbsp"
          },
          new Ingredient()
          {
            Id = -69,
            RecipeId = -8,
            Name = "Soy Sauce",
            Quantity = 0.33m,
            UOMId = "cup"
          },
          new Ingredient()
          {
            Id = -70,
            RecipeId = -8,
            Name = "Water",
            Quantity = 0.33m,
            UOMId = "cup"
          },
          new Ingredient()
          {
            Id = -71,
            RecipeId = -8,
            Name = "Dark Brown Sugar",
            Quantity = 0.5m,
            UOMId = "cup"
          },
          new Ingredient()
          {
            Id = -72,
            RecipeId = -8,
            Name = "Scallion Stalks, Green Parts Only, 2 Inch Pieces",
            Quantity = 4,
            UOMId = "ea"
          },
          new Ingredient()
          {
            Id = -73,
            RecipeId = -9,
            Name = "White Onion",
            Quantity = 1,
            UOMId = "ea"
          },
          new Ingredient()
          {
            Id = -74,
            RecipeId = -9,
            Name = "Bell Peppers",
            Quantity = 2,
            UOMId = "ea"
          },
          new Ingredient()
          {
            Id = -75,
            RecipeId = -9,
            Name = "Head of Cauliflower",
            Quantity = 1,
            UOMId = "ea"
          },
          new Ingredient()
          {
            Id = -76,
            RecipeId = -9,
            Name = "Portobello Mushroom",
            Quantity = 1,
            UOMId = "ea"
          },
          new Ingredient()
          {
            Id = -77,
            RecipeId = -9,
            Name = "Olive Oil",
            Quantity = 2,
            UOMId = "tbsp"
          },
          new Ingredient()
          {
            Id = -78,
            RecipeId = -1,
            Name = "Chili Powder",
            Quantity = 1,
            UOMId = "tbsp"
          },
          new Ingredient()
          {
            Id = -79,
            RecipeId = -9,
            Name = "Cumin",
            Quantity = 1,
            UOMId = "tsp"
          },
          new Ingredient()
          {
            Id = -80,
            RecipeId = -9,
            Name = "Smoked Paprika",
            Quantity = 1,
            UOMId = "tsp"
          },
          new Ingredient()
          {
            Id = -81,
            RecipeId = -9,
            Name = "Garlic Powder",
            Quantity = 1,
            UOMId = "tsp"
          },
          new Ingredient()
          {
            Id = -82,
            RecipeId = -9,
            Name = "Kosher Salt",
            Quantity = 1.5m,
            UOMId = "tsp"
          },
          new Ingredient()
          {
            Id = -83,
            RecipeId = -9,
            Name = "Ripe Avocado",
            Quantity = 2,
            UOMId = "ea"
          },
          new Ingredient()
          {
            Id = -84,
            RecipeId = -9,
            Name = "Lime",
            Quantity = 1,
            UOMId = "ea"
          },
          new Ingredient()
          {
            Id = -85,
            RecipeId = -9,
            Name = "Fresh Cilantro - to taste",
            Quantity = 1,
            UOMId = "ea"
          },
          new Ingredient()
          {
            Id = -86,
            RecipeId = -9,
            Name = "Tortillas",
            Quantity = 8,
            UOMId = "ea"
          },
          new Ingredient()
          {
            Id = -87,
            RecipeId = -9,
            Name = "Vegetarian Refried Beans",
            Quantity = 15,
            UOMId = "oz"
          },
          new Ingredient()
          {
            Id = -88,
            RecipeId = -10,
            Name = "Eggs",
            Quantity = 4,
            UOMId = "ea"
          },
          new Ingredient()
          {
            Id = -89,
            RecipeId = -10,
            Name = "Chili Powder",
            Quantity = 0.5m,
            UOMId = "tbsp"
          },
          new Ingredient()
          {
            Id = -90,
            RecipeId = -10,
            Name = "Garlic Powder",
            Quantity = 0.5m,
            UOMId = "tbsp"
          },
          new Ingredient()
          {
            Id = -91,
            RecipeId = -10,
            Name = "Cumin",
            Quantity = 0.5m,
            UOMId = "tbsp"
          },
          new Ingredient()
          {
            Id = -92,
            RecipeId = -10,
            Name = "Kosher Salt",
            Quantity = 0.25m,
            UOMId = "tsp"
          },
          new Ingredient()
          {
            Id = -93,
            RecipeId = -10,
            Name = "Olive Oil",
            Quantity = 0.5m,
            UOMId = "tbsp"
          },
          new Ingredient()
          {
            Id = -94,
            RecipeId = -10,
            Name = "Taco-Sized Tortillas",
            Quantity = 4,
            UOMId = "ea"
          },
          new Ingredient()
          {
            Id = -95,
            RecipeId = -10,
            Name = "Pico de Gallo",
            Quantity = 8,
            UOMId = "oz"
          },
          new Ingredient()
          {
            Id = -96,
            RecipeId = -10,
            Name = "Red Onion - Sliced",
            Quantity = 0.5m,
            UOMId = "ea"
          },
          new Ingredient()
          {
            Id = -97,
            RecipeId = -10,
            Name = "Cilantro Leaves - To Taste",
            Quantity = 1,
            UOMId = "ea"
          },
          new Ingredient()
          {
            Id = -98,
            RecipeId = -10,
            Name = "Hot Sauce",
            Quantity = 4,
            UOMId = "oz"
          }
        );
      });

      modelBuilder.Entity<UOM>(entity =>
      {
        entity.HasData(
          new UOM()
          {
            Id = "g",
            Name = "Gram"
          },
          new UOM()
          {
            Id = "oz",
            Name = "Ounce"
          },
          new UOM()
          {
            Id = "ml",
            Name = "Milliliter"
          },
          new UOM()
          {
            Id = "L",
            Name = "Liter"
          },
          new UOM()
          {
            Id = "cup",
            Name = "Cup"
          },
          new UOM()
            {
              Id = "tsp",
              Name = "Teaspoon"
            },
          new UOM()
            {
              Id = "tbsp",
              Name = "Tablespoon"
            },
          new UOM()
            {
              Id = "lb",
              Name = "Pound"
            },
          new UOM()
          {
            Id = "kg",
            Name = "Kilogram"
          },
          new UOM()
          {
            Id = "ea",
            Name = "Each"
          }
        );
      });

      modelBuilder.Entity<User>(entity =>
      {
        entity.HasData(
          new User()
          {
            // Identity uses a GUID method to generate unique user id.
            Id = userId,
            Name = "DemoUser",
            UserName = "demo@example.com",
            NormalizedUserName = "DEMO@EXAMPLE.COM",
            Email = "demo@example.com",
            NormalizedEmail = "DEMO@EXAMPLE.COM",
            EmailConfirmed = true,
            PasswordHash = "AQAAAAEAACcQAAAAEF2K8rjzLW+Pg5eripVafumGQa/4BRTSboiXDMa95qTMTPdH249hphHAkUQHUE0Ctw==",
            SecurityStamp = "MVLR77ABXD2ZQFYVDR6NAJB7UASX45MD",
            ConcurrencyStamp = "9ce7c801-2204-473c-9967-110632a96a79",
            LockoutEnabled = true
          }
        );
      });

      modelBuilder.Entity<MealTime>(entity =>
      {
        entity.HasData(
          new MealTime()
          {
            Id = -1,
            Name = "Breakfast"
          },
          new MealTime()
          {
            Id = -2,
            Name = "Lunch"
          },
          new MealTime()
          {
            Id = -3,
            Name = "Dinner"
          }
        );
      });
    }
  }
}
