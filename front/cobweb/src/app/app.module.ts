import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

// HTTP
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Component
import { AppComponent } from './app.component';

// Module
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

// Interceptor
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:  true  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
