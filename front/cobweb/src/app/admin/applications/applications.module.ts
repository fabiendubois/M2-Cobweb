import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { ApplicationsRoutingModule } from './applications-routing.module';

import { ApplicationsComponent } from './applications.component';
import { AddUpdateDialogComponent } from './dialogs/add-update-dialog/add-update-dialog.component';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    ApplicationsComponent,
    AddUpdateDialogComponent,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ApplicationsRoutingModule
  ],
  entryComponents: [
    AddUpdateDialogComponent,
    DeleteDialogComponent
  ]
})
export class ApplicationsModule { }
