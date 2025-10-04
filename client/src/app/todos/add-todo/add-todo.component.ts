import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../_services/todo.service';
import { AccountService } from '../../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css'
})
export class AddTodoComponent {
  private todoService = inject(TodoService);
  private accountService = inject(AccountService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  model: any = {};
  token: string = this.accountService.currentUser()?.token ?? '';

  addTodo() {
    this.todoService.addTodo(this.model, this.token).subscribe({
      next: response => {
        this.toastr.success('Todo has added successfully');
        this.router.navigateByUrl('/todos');
      },
      error: error => this.toastr.error(error.error)
    });
  }
}
