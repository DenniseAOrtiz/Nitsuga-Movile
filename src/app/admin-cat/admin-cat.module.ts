import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminCatPageRoutingModule } from './admin-cat-routing.module';

import { AdminCatPage } from './admin-cat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminCatPageRoutingModule
  ],
  declarations: [AdminCatPage]
})
export class AdminCatPageModule {}
