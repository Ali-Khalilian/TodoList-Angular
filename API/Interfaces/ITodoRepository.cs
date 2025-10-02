using API.Entities;

namespace API.Interfaces;

public interface ITodoRepository
{
      Task<IEnumerable<Todo>> GetTodosByUserIdAsync(int userId);   
    Task<Todo?> GetTodoByIdAsync(int id);                        
    Task AddTodoAsync(Todo todo);                               
    void UpdateTodo(Todo todo);                             
    void DeleteTodo(Todo todo);                                 
    Task<bool> SaveAllAsync();                              
}
