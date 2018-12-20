import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleLayoutComponent } from './shared/layouts/simple-layout/simple-layout.component';
import { FullLayoutComponent } from './shared/layouts/full-layout/full-layout.component';

import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'    
  },
  {
    path: '',
    component: SimpleLayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule'
      }
    ]
  },
  {
    path: '',
    component: FullLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'charts',
        loadChildren: './charts/charts.module#ChartsModule'
      },
      {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }