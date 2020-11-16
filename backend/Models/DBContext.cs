using System;
using Api.Models;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;

namespace Api.Models
{
  public class DBContext : DbContext
  {
    public virtual DbSet<Recipe> Recipies { get; set; }

    public DBContext(DbContextOptions<DBContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
    }
  }
}
