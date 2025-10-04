import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Todo } from '../_models/todo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private http = inject(HttpClient);
  baseUrl = 'https://localhost:5011/api/';

  getTodos(token: string): Observable<Todo[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Todo[]>(this.baseUrl + 'todos', { headers });
  }


  addTodo(model: any, token: string): Observable<Todo> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<Todo>(this.baseUrl + 'todos', model, { headers });
  }

  deleteTodo(id: number, token: string): Observable<Todo> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<Todo>(`${this.baseUrl}todos/${id}`, { headers });
  }

  updateTodo(token: string, model: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.put<Todo>(`${this.baseUrl}todos/${model.id}`, model, { headers });
  }

  getTodoById(id: number, token: string): Observable<Todo> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Todo>(`${this.baseUrl}todos/${id}`, { headers });
  }

  completedTodo(id: number, token: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.put<Todo>(`${this.baseUrl}todos/complete/${id}`, {}, { headers });

  }

}
