import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechnologiesComponent } from './technologies/technologies.component';

const routes: Routes = [
  {
    path: 'technologies',
    component: TechnologiesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
