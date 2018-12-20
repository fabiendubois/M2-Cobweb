import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';

// Charts
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { NgxchartComponent } from './ngxchart/ngxchart.component';

@NgModule({
  declarations: [NgxchartComponent],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    // Charts
    NgxChartsModule,
    NgxGraphModule
  ]
})
export class ChartsModule { }
