using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Tansu.Api.Models;
using Tansu.Api.Core;
using Tansu.Api.Interfaces;

namespace Tansu.Api.Features
{
    public class CreateToDo
    {
        public class Validator: AbstractValidator<Request>
        {
            public Validator()
            {
                RuleFor(request => request.ToDo).NotNull();
                RuleFor(request => request.ToDo).SetValidator(new ToDoValidator());
            }
        
        }

        public class Request: IRequest<Response>
        {
            public ToDoDto ToDo { get; set; }
        }

        public class Response: ResponseBase
        {
            public ToDoDto ToDo { get; set; }
        }

        public class Handler: IRequestHandler<Request, Response>
        {
            private readonly ITansuDbContext _context;
        
            public Handler(ITansuDbContext context)
                => _context = context;
        
            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                var toDo = new ToDo()
                {
                    Name = request.ToDo.Name
                };
                
                _context.ToDos.Add(toDo);
                
                await _context.SaveChangesAsync(cancellationToken);
                
                return new Response()
                {
                    ToDo = toDo.ToDto()
                };
            }
            
        }
    }
}
