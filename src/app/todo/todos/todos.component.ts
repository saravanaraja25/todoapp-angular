import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo, TodoStatus } from '../Todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  category: any;

  todos: Todo[] = [];

  todosOnProgress: Todo[] = [];

  todosDone: Todo[] = [];

  constructor(private todoService: TodoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.category = this.route.snapshot.paramMap.get('id');
    this.todoService.subjectMessage.subscribe(
      (todos: Todo[]) => {
        if(todos) {
          this.todos = todos.filter(t => t.status === TodoStatus.Todo);
          this.todosOnProgress = todos.filter(t => t.status === TodoStatus.Onprogress);
          this.todosDone = todos.filter(t => t.status === TodoStatus.Done);
        }
      }
    );
    this.todoService.getTodos(this.category);
  }

  addTodo(todo: string) {
    this.todoService.addTodo({
      title: todo,
      status: TodoStatus.Todo,
      createdAt: new Date()
    }, this.category);
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

}
