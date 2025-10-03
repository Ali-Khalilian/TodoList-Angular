using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API.Controllers;

public class TodosController(ITodoRepository todoRepo) : BaseApiController
{

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Todo>>> GetTodos()
    {
         var username = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(username))
            return Unauthorized("User not found");

        var todos = await todoRepo.GetTodosByUsernameAsync(username);

        return Ok(todos);
    }
}
