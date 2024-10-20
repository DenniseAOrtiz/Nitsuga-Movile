import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminProdPage } from './admin-prod.page';

const routes: Routes = [
  {
    path: '',
    component: AdminProdPage
  },
  { 
    path: 'admin-prod/:id', 
    component: AdminProdPage 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminProdPageRoutingModule {}
