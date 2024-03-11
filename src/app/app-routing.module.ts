import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'criaUsuario',
    pathMatch: "full"
  },
  {
    path:'criaUsuario',
    component: UsersComponent
  },
  {
    path:'tarefasUsuario',
    component: TasksComponent
  }

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
