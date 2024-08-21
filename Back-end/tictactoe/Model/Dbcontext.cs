using Microsoft.EntityFrameworkCore;
using System;

namespace tictactoe.Model
{
    public class AppDbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<User> AppUser { get; set; }
    }
}
