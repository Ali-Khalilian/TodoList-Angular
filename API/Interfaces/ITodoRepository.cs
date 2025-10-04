using API.Entities;

namespace API.Interfaces;

public interface ITodoRepository
{
  Task<IEnumerable<Todo>> GetTodosByUsernameAsync(string username);
  Task<Todo?> GetTodoByIdAsync(int id);
  Task AddTodoAsync(Todo todo);
  Task<Todo?> UpdateTodoAsync(Todo todo);
  Task<Todo?> CompleteTodoAsync(int id);
  Task<Todo?> DeleteTodoAsync(int id);
  Task<bool> SaveAllAsync();
}
