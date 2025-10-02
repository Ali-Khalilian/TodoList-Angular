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

    public void DeleteTodo(Todo todo)
    {
        context.Todos.Remove(todo);
    }

    public async Task<Todo?> GetTodoByIdAsync(int id)
    {
        return await context.Todos.FindAsync(id);
    }

    public async Task<IEnumerable<Todo>> GetTodosByUserIdAsync(int userId)
    {
        return await context.Todos
            .Where(t => t.AppUserId == userId)
            .ToListAsync();
    }

    public void UpdateTodo(Todo todo)
    {
        context.Todos.Update(todo);
    }

    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }
}
