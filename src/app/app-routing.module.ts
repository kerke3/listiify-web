import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { UsersComponent } from './users/users.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'users', component: UsersComponent },
  { path: 'tasks/:email', component: TasksComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
