import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['user/login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);


const routes: Routes = [
  {
    path: '',
    redirectTo: '/todos',
    pathMatch: 'full'
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'todos',
    component: CategoryComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'todos/:id',
    loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: '**',
    redirectTo: '/todos'
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
