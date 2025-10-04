using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;


namespace API.Controllers;

[Authorize]
public class TodosController(ITodoRepository todoRepo, IUserRepository userRepo) : BaseApiController
{

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Todo>>> GetTodos()
    {
        var username = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(username))
            return Unauthorized("User not found");

        var todos = await todoRepo.GetTodosByUsernameAsync(username);

        return Ok(todos);
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<TodoDto>> GetTodo(int id)
    {
        var username = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(username))
            return Unauthorized("User not found");

        var todo = await todoRepo.GetTodoByIdAsync(id);

        if (todo == null)
            return NotFound("Todo not found");

        if (todo.AppUser.UserName != username)
            return Forbid("You are not allowed to access this todo");

        var result = new TodoDto
        {
            Id = todo.Id,
            Title = todo.Title,
            Description = todo.Description,
            IsCompleted = todo.Iscompleted,
            CreatedAt = todo.CreatedAt,
            UpdatedAt = todo.UpdatedAt
        };

        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<Todo>> AddTodo(TodoDto todoDto)
    {
        var username = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(username))
            return Unauthorized("User not found");

        var user = await userRepo.GetUserByUsernameAsync(username);
        if (user == null) return Unauthorized("User not found");


        var todo = new Todo
        {
            Title = todoDto.Title,
            Description = todoDto.Description,
            Iscompleted = false,
            AppUserId = user.Id
        };

        await todoRepo.AddTodoAsync(todo);

        if (await todoRepo.SaveAllAsync())
        {
            var result = new TodoDto
            {
                Id = todo.Id,
                Title = todo.Title,
                Description = todo.Description,
                IsCompleted = todo.Iscompleted,
                CreatedAt = todo.CreatedAt
            };
            return Ok(result);
        }

        return BadRequest("Failed to add todo");
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Todo>> DeleteTodo(int id)
    {

        var deletedTodo = await todoRepo.DeleteTodoAsync(id);

        if (deletedTodo == null)
            return NotFound("Todo not found");

        return Ok(deletedTodo);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<TodoDto>> UpdateTodo(int id, TodoDto todoDto)
    {
        var username = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(username))
            return Unauthorized("User not found");

        var user = await userRepo.GetUserByUsernameAsync(username);
        if (user == null) return Unauthorized("User not found");

        var existingTodo = await todoRepo.GetTodoByIdAsync(id);
        if (existingTodo == null || existingTodo.AppUserId != user.Id)
            return NotFound("Todo not found");

        existingTodo.Title = todoDto.Title;
        existingTodo.Description = todoDto.Description;
        existingTodo.UpdatedAt = DateTime.UtcNow;

        await todoRepo.UpdateTodoAsync(existingTodo);

        if (await todoRepo.SaveAllAsync())
        {
            var result = new TodoDto
            {
                Id = existingTodo.Id,
                Title = existingTodo.Title,
                Description = existingTodo.Description,
                UpdatedAt = existingTodo.UpdatedAt
            };
            return Ok(result);
        }

        return BadRequest("Failed to update todo");
    }

    [HttpPut("complete/{id}")]
    public async Task<ActionResult<TodoDto>> CompleteTodo(int id)
    {
        var todo = await todoRepo.CompleteTodoAsync(id);
        if (todo == null) return NotFound("Todo not found");

        if (await todoRepo.SaveAllAsync())
        {
            return Ok(new TodoDto
            {
                Id = todo.Id,
                Title = todo.Title,
                Description = todo.Description,
                IsCompleted = todo.Iscompleted,
                UpdatedAt = todo.UpdatedAt,
            });
        }

        return BadRequest("Failed to complete todo");
    }

}
