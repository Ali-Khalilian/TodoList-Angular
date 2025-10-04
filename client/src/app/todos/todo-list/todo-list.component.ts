import { Component, inject, OnInit } from '@angular/core';
import { Todo } from '../../_models/todo';
import { AccountService } from '../../_services/account.service';
import { TodoService } from '../../_services/todo.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {
  private accountService = inject(AccountService);
  private todoService = inject(TodoService);
  private toastr = inject(ToastrService);

  todos: Todo[] = [];

  token: string = this.accountService.currentUser()?.token ?? '';

  ngOnInit(): void {
    this.loadTodos();
  };

  loadTodos() {
    this.todoService.getTodos(this.token).subscribe({
      next: todos => {
        this.todos = todos;
        console.log(this.todos);
      },
      error: error => this.toastr.error(error.error)
    });
  };

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id, this.token).subscribe({
      next: response => {
        this.todos = this.todos.filter(t => t.id !== id);
        this.toastr.success(`Todo deleted at ${response.deletedAt}`);
      },
      error: error => this.toastr.error(error.error)
    });
  };

  completeTodo(id: number) {
    this.todoService.completedTodo(id, this.token).subscribe({
      next: updatedTodo => {
        const index = this.todos.findIndex(t => t.id === id);
        if (index !== -1) {
          this.todos[index].iscompleted = true;
        }
        this.toastr.success(`Todo completed at ${updatedTodo.updatedAt}`);
      },
      error: err => this.toastr.error(err.error)
    });
  }
}
