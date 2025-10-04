import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../_models/todo';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../../_services/todo.service';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../_services/account.service';

@Component({
  selector: 'app-edit-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-todo.component.html',
  styleUrl: './edit-todo.component.css'
})
export class EditTodoComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private todoService = inject(TodoService);
  private toastr = inject(ToastrService);
  private accountService = inject(AccountService);


  todo: Todo | undefined;
  token: string = this.accountService.currentUser()?.token ?? '';


  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.todoService.getTodoById(id, this.token).subscribe({
        next: t => this.todo = t,
        error: error => this.toastr.error(error.error)
      });
    }
  }


  editTodo() {
    if (!this.todo) return;

    const model = {
      id: this.todo.id,
      title: this.todo.title,
      description: this.todo.description,
    };

    this.todoService.updateTodo(this.token, model).subscribe({
      next:  (response) => {
        this.toastr.success(`Updated successfully at ${response.updatedAt}`)
        this.router.navigateByUrl('/todos');
      },
      error: err => console.error(err)
    });
  };

}
