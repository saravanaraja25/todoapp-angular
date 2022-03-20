import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from './Todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private apiUrl: string = environment.apiUrl+'categories/';

  todos: Todo[] = [];

  private subjectSource = new Subject<Todo[]>();

  subjectMessage = this.subjectSource.asObservable();

  constructor(private http: HttpClient) { }

  getTodos(categoryId: string) {
    this.todos = [];
    this.http.get<Todo[]>(this.apiUrl+ categoryId + '/todos.json').subscribe(
      (todos) => {
        if(todos) {
          Object.entries(todos).forEach(([key, todo]) => {
            todo.id = key;
            this.todos.push(todo);
          });
        }
        this.subjectSource.next(this.todos);
      }
    );
  }

  addTodo(todo: Todo, categoryId: string) {
    this.http.post<Todo>(this.apiUrl + categoryId + '/todos.json', todo).subscribe(
      (data) => {
        todo.id = data.name;
        this.todos.push(todo);
        this.subjectSource.next(this.todos);
      }
    );
  }

  updateTodo(todo: Todo, categoryId: string) {
    this.http.put(this.apiUrl + categoryId + '/todos/' + todo.id + '.json', todo).subscribe(
      (data) => {
        this.todos = this.todos.map(t => {
          if (t.id === todo.id) {
            return todo;
          }
          return t;
        });
        this.subjectSource.next(this.todos);
      }
    );
  }
  removeTodo(todo: Todo, categoryId: string) {
    this.http.delete(this.apiUrl + categoryId + '/todos/' + todo.id + '.json').subscribe(
      () => {
        this.todos = this.todos.filter(t => t.id !== todo.id);
        this.subjectSource.next(this.todos);
      }
    );
  }
}
