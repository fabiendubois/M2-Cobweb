import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleLayoutComponent } from './shared/layouts/simple-layout/simple-layout.component';
import { FullLayoutComponent } from './shared/layouts/full-layout/full-layout.component';

import { AuthGuard } from './shared/guards/auth.guard';
import { AdminGuard } from './shared/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'charts',
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
    canActivate: [AuthGuard],
    children: [
      {
        path: 'charts',
        loadChildren: './charts/charts.module#ChartsModule',
      },
      {
        path: 'admin/applications',
        canActivate: [AdminGuard],
        loadChildren: './admin/applications/applications.module#ApplicationsModule',
      },
      {
        path: 'admin/flows',
        canActivate: [AdminGuard],
        loadChildren: './admin/flows/flows.module#FlowsModule'
      },
      {
        path: 'admin/technologies',
        canActivate: [AdminGuard],
        loadChildren: './admin/technologies/technologies.module#TechnologiesModule'
      }
    ]
  },
  {
    path: '**', redirectTo: 'charts'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }