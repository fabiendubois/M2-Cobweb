import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlowsComponent } from './flows.component';

const routes: Routes = [
  {
    path: '',
    component: FlowsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlowsRoutingModule { }
