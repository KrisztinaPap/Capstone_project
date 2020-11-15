using System;
using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Models
{
  public class DBContext : DbContext
  {
    public virtual DbSet<Recipe> Recipies { get; set; }

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
    }
  }
}
