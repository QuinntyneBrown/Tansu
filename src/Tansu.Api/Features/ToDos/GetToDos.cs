using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using Tansu.Api.Core;
using Tansu.Api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Tansu.Api.Features
{
    public class GetToDos
    {
        public class Request: IRequest<Response> { }

        public class Response: ResponseBase
        {
            public List<ToDoDto> ToDos { get; set; }
        }

        public class Handler: IRequestHandler<Request, Response>
        {
            private readonly ITansuDbContext _context;
        
            public Handler(ITansuDbContext context)
                => _context = context;
        
            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                return new () {
                    ToDos = await _context.ToDos.Select(x => x.ToDto()).ToListAsync()
                };
            }
            
        }
    }
}
