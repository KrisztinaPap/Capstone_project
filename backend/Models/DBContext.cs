using System;
using Api.Models;
using Microsoft.EntityFrameworkCore;

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
          .OnDelete(DeleteBehavior.Restrict);
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
      });

      modelBuilder.Entity<Plan>(entity =>
      {
        entity.HasMany(a => a.Meals)
          .WithOne()
          .HasForeignKey(b => b.PlanId)
          .OnDelete(DeleteBehavior.Cascade);
      });

      modelBuilder.Entity<Meal>(entity =>
      {
        entity.HasOne(a => a.MealTime)
          .WithMany()
          .HasForeignKey(b => b.MealTimeId)
          .OnDelete(DeleteBehavior.Restrict);
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
            Id = -4,
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
      
      
    }
  }
}
