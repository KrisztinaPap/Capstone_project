using System;
using System.Collections.Generic;
using Api.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Api.Models
{
  public class DBContext : DbContext
  {
    public virtual DbSet<Recipe> Recipes { get; set; }

    

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      if (!optionsBuilder.IsConfigured)
      {
        string connection =
          "server=localhost;" +
          "port=3306;" +
          "user=root;" +
          "database=puddlejumper_capstone;";

        string version = "10.4.14-MariaDB";

        optionsBuilder.UseMySql(connection, x => x.ServerVersion(version));
      }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<Recipe>(entity =>
      {
        entity.HasMany(a => a.Ingredients)
          .WithOne()
          .HasForeignKey(key => key.RecipeId)
          .OnDelete(DeleteBehavior.Cascade);
        
        entity.Property(e => e.Tags)
          .HasConversion(
            v => JsonConvert.SerializeObject(v),
            v => JsonConvert.DeserializeObject<List<string>>(v))
          .HasColumnType("json");
       
        entity.HasData(
          new Recipe()
          {
            Id = -1,
            CategoryId = -1,
            Name = "Chicken and Potatoes with Hot Sauce",
            Fat = 30,
            Protein = 70,
            Carbohydrates = 100,
            Calories = 860,
            Instructions = string.Join("\n",
              "* Cook Chicken",
              "* Cook Potatoes",
              "* Smother in Hot Sauce"
            ),
            Tags = new List<string>() {"Spicy"},
            Image = null,
            DateModified = DateTime.Today,
            DateCreated = DateTime.Today,
            PrepTime = 35,
            Servings = 2,
            Notes = string.Join("\n",
              "* Marinate Chicken for at least 12 hours for maximum flavor"
              )
          },
          new Recipe()
          {
            Id = -2,
            CategoryId = -2,
            Name = "Steak and Sweet Potatoes",
            Fat = 10,
            Protein = 70,
            Carbohydrates = 115,
            Calories = 770,
            Instructions = string.Join("\n",
              "* Cook Steak on BBQ",
              "* Cook Potatoes to personal preference",
              "* Serve and Enjoy!"
            ),
            Tags = new List<string>() {"BBQ"},
            Image = null,
            DateModified = DateTime.Today,
            DateCreated = DateTime.Today,
            PrepTime = 25,
            Servings = 2,
            Notes = string.Join("\n",
              "* Marinate Steak for at least 12 hours for maximum flavor",
              "* Can be cooked on the stovetop but is better when BBQ'd",
              "* Potatoes can be diced, sliced, or baked. Personal preference."
            )            
          }
        );
      });

      modelBuilder.Entity<MealRecipe>(entity =>
      {
        // Making composite key
        // TODO: Add to citations
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
            UserId = -1,
            Day = DateTime.Today
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
            MealTimeId = "-2"
          },
          new Meal()
          {
            Id = -2,
            PlanId = -1,
            MealTimeId = "-3"
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
            Name = "Poatato",
            Quantity = 4,
            UOMId = "ea"
          },
          new Ingredient()
          {
            Id = -4,
            RecipeId = -2,
            Name = "Striploin",
            Quantity = 2,
            UOMId = "ea"
          },
          new Ingredient()
          {
            Id = -5,
            RecipeId = -2,
            Name = "Sweet Potato",
            Quantity = 3,
            UOMId = "ea"
          },
          new Ingredient()
          {
            Id = -6,
            RecipeId = -2,
            Name = "Barbeque Sauce",
            Quantity = 4,
            UOMId = "tbsp"
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
            Id = "Cup",
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
            Id = -1,
            Name = "TestAdminWarren",
            Password = "$uper$ecurePHPa$$w0rd",
            PasswordSalt = "$alt33",
            Email = "phprox123@gmail.com"
          }
        );
      });
      
      modelBuilder.Entity<MealTime>(entity =>
      {
        entity.HasData(
          new MealTime()
          {
            // TODO:
            // I think Id should be int instead of string. Discuss this w/ backend.
            Id = "-1",
            Name = "Breakfast"
          },
          new MealTime()
          {
            Id = "-2",
            Name = "Lunch"
          },
          new MealTime()
          {
            Id = "-3",
            Name = "Dinner"
          }
        );
      });
      
    }
  }
}
