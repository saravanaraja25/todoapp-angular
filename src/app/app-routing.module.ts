import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/todos',
    pathMatch: 'full'
  },
  {
    path: 'todos',
    component: CategoryComponent,
    // children: [
    //   {
    //     path: '',
    //     loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule),
    //   }
    // ]
  },
  {
    path: 'todos/:id',
    loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule),
  },
  {
    path: '**',
    redirectTo: '/todos'
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
