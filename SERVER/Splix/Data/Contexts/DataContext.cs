using Microsoft.EntityFrameworkCore;
using Splix.Data.Models;

namespace Splix.Data.Contexts
{
    public class DataContext : DbContext
    {
        public DbSet<Group> Groups { get; set; }
        public DbSet<Member> Members { get; set; }
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
    }
}
