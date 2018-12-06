import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

// Component
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';

// HTTP
import { HttpClientModule } from '@angular/common/http';

// Form
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

// Material import 
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { TechnologiesComponent } from './admin/technologies/technologies.component';


@NgModule({
  declarations: [
    // Component
    AppComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    TechnologiesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // Form 
    ReactiveFormsModule,
    FormsModule,
    // HTTP
    HttpClientModule,
    // Material Import
    BrowserAnimationsModule,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
