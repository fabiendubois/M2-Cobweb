import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NgxchartComponent } from './ngxchart/ngxchart.component';

const routes: Routes = [
  {
    path: '',
    component: NgxchartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsRoutingModule { }
