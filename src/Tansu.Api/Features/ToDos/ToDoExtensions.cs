using System;
using Tansu.Api.Models;

namespace Tansu.Api.Features
{
    public static class ToDoExtensions
    {
        public static ToDoDto ToDto(this ToDo toDo)
        {
            return new ()
            {
                ToDoId = toDo.ToDoId,
                Name = toDo.Name,
            };
        }
        
    }
}
