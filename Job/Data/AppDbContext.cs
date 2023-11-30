using Job.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using static NuGet.Packaging.PackagingConstants;

namespace Job.Data
{
    public class AppDbContext : IdentityDbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        public DbSet<TaskJob> TaskJob { get; set; }
    }

   
      //public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
      //{
      //}


      //protected override void OnModelCreating(ModelBuilder modelBuilder)
      //{
      //    base.OnModelCreating(modelBuilder);
      //    modelBuilder.Entity<TaskJob>();

      //}

   
}
