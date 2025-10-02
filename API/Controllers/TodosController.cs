using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API.Controllers;

public class TodosController(ITodoRepository todoRepo) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Todo>>> GetTodos()
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(userIdClaim))
            return Unauthorized("User ID not found");

        var userId = int.Parse(userIdClaim);
        var todos = await todoRepo.GetTodosByUserIdAsync(userId);
        return Ok(todos);
    }

    [HttpPost]
    public async Task<ActionResult<Todo>> AddTodo(Todo todo)
    {
        var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(userIdClaim))
            return Unauthorized("User ID not found");

        var userId = int.Parse(userIdClaim);
        todo.AppUserId = userId;

        await todoRepo.AddTodoAsync(todo);
        if (await todoRepo.SaveAllAsync()) return Ok(todo);

        return BadRequest("Failed to add todo");
    }
}
