import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationsComponent } from './applications/applications.component';
import { FlowsComponent } from './flows/flows.component';
import { TechnologiesComponent } from './technologies/technologies.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: 'applications',
    component: ApplicationsComponent
  },
  {
    path: 'flows',
    component: FlowsComponent
  },
  {
    path: 'technologies',
    component: TechnologiesComponent
  },
  {
    path: 'users',
    component: UsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
