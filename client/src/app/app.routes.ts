import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './authentication/auth/auth.component';
import { authGuard } from './_guards/auth.guard';
import { TodoListComponent } from './todos/todo-list/todo-list.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'todos', component: TodoListComponent, canActivate: [authGuard] },
    { path: '**', component: HomeComponent, pathMatch: 'full' },
];
