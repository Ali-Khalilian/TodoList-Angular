using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class TodoRepository(DataContext context) : ITodoRepository
{
    public async Task AddTodoAsync(Todo todo)
    {
        await context.Todos.AddAsync(todo);
    }

    public async Task<Todo?> DeleteTodoAsync(int id)
    {
        var todo = await context.Todos.FindAsync(id);
        if (todo == null) return null;

        todo.DeletedAt = DateTime.UtcNow;
        context.Todos.Remove(todo);
        await context.SaveChangesAsync();

        return todo;
    }

    public async Task<Todo?> GetTodoByIdAsync(int id)
    {
        return await context.Todos
        .Include(t => t.AppUser)
        .FirstOrDefaultAsync(t => t.Id == id);
    }

    public async Task<IEnumerable<Todo>> GetTodosByUsernameAsync(string username)
    {
        return await context.Todos
     .Where(t => t.AppUser.UserName == username)
     .ToListAsync();
    }

    public async Task<Todo?> UpdateTodoAsync(Todo todo)
    {
        var existingTodo = await context.Todos.FindAsync(todo.Id);
        if (existingTodo == null) return null;

        existingTodo.Title = todo.Title;
        existingTodo.Description = todo.Description;
        existingTodo.UpdatedAt = DateTime.UtcNow;

        context.Todos.Update(existingTodo);

        return existingTodo;
    }

    public async Task<Todo?> CompleteTodoAsync(int id)
    {
        var todo = await context.Todos.FindAsync(id);
        if (todo == null) return null;

        todo.Iscompleted = true;
        todo.UpdatedAt = DateTime.UtcNow;

        return todo;
    }

    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }
}