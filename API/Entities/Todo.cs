namespace API.Entities;

public class Todo
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public required bool Iscompleted { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }

    public int AppUserId { get; set; }
    public AppUser AppUser { get; set; } = null!;
}
