import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './authentication/auth/auth.component';
import { authGuard } from './_guards/auth.guard';
import { TodoListComponent } from './todos/todo-list/todo-list.component';
import { AddTodoComponent } from './todos/add-todo/add-todo.component';
import { EditTodoComponent } from './todos/edit-todo/edit-todo.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'auth', component: AuthComponent },
    {
        path: 'todos',
        canActivate: [authGuard],
        children: [
            { path: '', component: TodoListComponent },
            { path: 'add', component: AddTodoComponent },
            { path: 'edit/:id', component: EditTodoComponent }
        ]
    },
    { path: '**', component: HomeComponent, pathMatch: 'full' },
];
