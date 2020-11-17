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
          "password=ROOTPASS;" +
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

    }
  }
}
