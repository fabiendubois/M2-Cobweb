import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { FlowsRoutingModule } from './flows-routing.module';

import { FlowsComponent } from './flows.component';
import { AddUpdateDialogComponent } from './dialogs/add-update-dialog/add-update-dialog.component';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    FlowsComponent,
    AddUpdateDialogComponent, 
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FlowsRoutingModule
  ],
  entryComponents: [
    AddUpdateDialogComponent, 
    DeleteDialogComponent
  ]
})
export class FlowsModule { }
