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
}
