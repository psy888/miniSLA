import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'list',
    loadChildren: () => import('./pages/device-list/device-list.module').then(m => m.DeviceListModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'edit',
    loadChildren: () => import('./pages/edit/edit.module').then(m => m.EditModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'add',
    loadChildren: () => import('./pages/add/add.module').then(m => m.AddModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'info',
    loadChildren: () => import('./pages/info/info.module').then(m => m.InfoModule),
  },
  {
    path: '',
    redirectTo: 'info',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
