import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminCatPage } from './admin-cat.page';

const routes: Routes = [
  {
    path: '',
    component: AdminCatPage
  },
  {
    path: 'admin-prod/:id',
    loadChildren: () => import('../admin-prod/admin-prod.module').then( m => m.AdminProdPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminCatPageRoutingModule {}
