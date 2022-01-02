using Tansu.Api.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Threading;

namespace Tansu.Api.Interfaces
{
    public interface ITansuDbContext
    {
        DbSet<ToDo> ToDos { get; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
        
    }
}
