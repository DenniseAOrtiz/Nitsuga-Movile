import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage
  },  {
    path: 'admin-cat',
    loadChildren: () => import('./admin-cat/admin-cat.module').then( m => m.AdminCatPageModule)
  },
  {
    path: 'admin-prod',
    loadChildren: () => import('./admin-prod/admin-prod.module').then( m => m.AdminProdPageModule)
  },
  {
    path: 'admin-users',
    loadChildren: () => import('./admin-users/admin-users.module').then( m => m.AdminUsersPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
