import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Todo, TodoStatus } from '../Todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit, OnDestroy {

  category: any;

  categoryName: string= '';

  subTodos: Subscription = new Subscription;

  subCategory: Subscription = new Subscription;

  todos: Todo[] = [];

  todosOnProgress: Todo[] = [];

  todosDone: Todo[] = [];

  constructor(private todoService: TodoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.category = this.route.snapshot.paramMap.get('id');
    this.subTodos = this.todoService.subjectMessage.subscribe(
      (todos: Todo[]) => {
        console.log(todos);
        if(todos) {
          this.todos = todos.filter(t => t.status === TodoStatus.Todo);
          this.todosOnProgress = todos.filter(t => t.status === TodoStatus.Onprogress);
          this.todosDone = todos.filter(t => t.status === TodoStatus.Done);
        }
      }
    );
    this.subCategory = this.todoService.msg.subscribe(
      (categoryName: string) => {
        this.categoryName = categoryName;
      }
    );
    this.todoService.getTodos(this.category);
  }

  addTodo(todo: string) {
    if(todo) {
      this.todoService.addTodo({
        title: todo,
        status: TodoStatus.Todo,
        createdAt: new Date()
      }, this.category);
    }
  }

  removeTodo(todo: Todo) {
    this.todoService.removeTodo(todo,this.category);
  }

  drop(event: CdkDragDrop<Todo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {     
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      if(event.container.id === 'cdk-drop-list-0') {
        this.todos[event.currentIndex].status = TodoStatus.Todo;
        this.todoService.updateTodo(this.todos[event.currentIndex], this.category);
      } else if(event.container.id === 'cdk-drop-list-1') {
        this.todosOnProgress[event.currentIndex].status = TodoStatus.Onprogress;
        this.todoService.updateTodo(this.todosOnProgress[event.currentIndex], this.category);
      }else if(event.container.id === 'cdk-drop-list-2') {
        this.todosDone[event.currentIndex].status = TodoStatus.Done;
        this.todoService.updateTodo(this.todosDone[event.currentIndex], this.category);
      }
    }
  }

  ngOnDestroy(): void {
    this.subTodos.unsubscribe();
    this.subCategory.unsubscribe();
  }

}
