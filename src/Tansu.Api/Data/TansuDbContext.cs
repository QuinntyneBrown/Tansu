using Tansu.Api.Models;
using Tansu.Api.Core;
using Tansu.Api.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;

namespace Tansu.Api.Data
{
    public class TansuDbContext: DbContext, ITansuDbContext
    {
        public DbSet<ToDo> ToDos { get; private set; }
        public TansuDbContext(DbContextOptions options)
            :base(options) { }

    }
}
