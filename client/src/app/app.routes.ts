import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './authentication/auth/auth.component';
import { authGuard } from './_guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'todos', component: HomeComponent, canActivate: [authGuard] },
    { path: '**', component: HomeComponent, pathMatch: 'full' },
];
