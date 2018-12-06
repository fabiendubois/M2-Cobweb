import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { TechnologiesComponent } from './admin/technologies/technologies.component';

const routes: Routes = [
  { path: 'sign_in', component: SignInComponent },
  { path: 'sign_up', component: SignUpComponent },
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'admin/technologies', canActivate: [AuthGuard], component: TechnologiesComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
