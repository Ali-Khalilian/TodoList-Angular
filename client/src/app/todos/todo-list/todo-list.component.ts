import { Component, inject, OnInit } from '@angular/core';
import { Todo } from '../../_models/todo';
import { AccountService } from '../../_services/account.service';
import { TodoService } from '../../_services/todo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [],
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
  }

  loadTodos() {
    this.todoService.getTodos(this.token).subscribe({
      next: todos => {
        console.log(todos);
        this.todos = todos;

      },
      error: error =>  this.toastr.error(error.error)
    });
  }
}
