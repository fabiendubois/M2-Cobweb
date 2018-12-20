import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';

// Component
import { TechnologiesComponent } from './technologies/technologies.component';
import { FlowsComponent } from './flows/flows.component';
import { ApplicationsComponent } from './applications/applications.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    // Component
    TechnologiesComponent,
    FlowsComponent,
    ApplicationsComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
