using System;
using CrudApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CrudApi.Data
{
    public class AppDbContext : DbContext
    {
        public IConfiguration _config { get; set; }
        public AppDbContext(IConfiguration config)
        {
            _config = config;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_config.GetConnectionString("DefaultConnection"));
        }

        public DbSet<Person> People { get; set; }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    base.OnModelCreating(modelBuilder);

        //    // Configure the Person entity
        //    modelBuilder.Entity<Person>()
        //        .Property(p => p.FirstName);

        //    modelBuilder.Entity<Person>()
        //        .Property(p => p.LastName);

        //    modelBuilder.Entity<Person>()
        //        .Property(p => p.Email);
        //}
    }
}
