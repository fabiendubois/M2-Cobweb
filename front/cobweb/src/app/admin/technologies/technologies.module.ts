import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { TechnologiesComponent } from './technologies.component';
import { AddUpdateDialogComponent } from './dialogs/add-update-dialog/add-update-dialog.component';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';

import { TechnologiesRoutingModule } from './technologies-routing.module';

@NgModule({
  declarations: [
    TechnologiesComponent, 
    AddUpdateDialogComponent, 
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TechnologiesRoutingModule,
  ],
  entryComponents: [
    AddUpdateDialogComponent, 
    DeleteDialogComponent
  ]
})
export class TechnologiesModule { }
