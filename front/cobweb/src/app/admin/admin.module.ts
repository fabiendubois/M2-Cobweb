import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';

// Component
import { TechnologiesComponent } from './technologies/technologies.component';
import { AddUpdateDialogComponent } from './technologies/dialogs/add-update-dialog/add-update-dialog.component';
import { DeleteDialogComponent } from './technologies/dialogs/delete-dialog/delete-dialog.component';

import { FlowsComponent } from './flows/flows.component';
import { ApplicationsComponent } from './applications/applications.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    // Component
    TechnologiesComponent,
    FlowsComponent,
    ApplicationsComponent,
    UsersComponent,
    AddUpdateDialogComponent,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
  entryComponents: [
    DeleteDialogComponent,
  ]
})
export class AdminModule { }
