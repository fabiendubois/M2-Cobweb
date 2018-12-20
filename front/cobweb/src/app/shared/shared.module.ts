import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Component
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout/simple-layout.component';


// HTTP
import { HttpClientModule } from '@angular/common/http';

// Form
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

// Material import 
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [FullLayoutComponent, SimpleLayoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    // Form 
    ReactiveFormsModule,
    FormsModule,
    // HTTP
    HttpClientModule,
    // Material Import
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatIconModule,
    MatSnackBarModule
  ],
  exports: [
    // Form 
    ReactiveFormsModule,
    FormsModule,
    // HTTP
    HttpClientModule,
    // Material Export
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatIconModule,
    MatSnackBarModule,

  ]
})
export class SharedModule { }
