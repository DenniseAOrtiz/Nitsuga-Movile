import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminProdPageRoutingModule } from './admin-prod-routing.module';

import { AdminProdPage } from './admin-prod.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminProdPageRoutingModule
  ],
  declarations: [AdminProdPage]
})
export class AdminProdPageModule {}
