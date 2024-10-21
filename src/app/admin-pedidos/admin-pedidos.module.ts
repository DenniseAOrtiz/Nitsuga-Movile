import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPedidosPageRoutingModule } from './admin-pedidos-routing.module';

import { AdminPedidosPage } from './admin-pedidos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPedidosPageRoutingModule
  ],
  declarations: [AdminPedidosPage]
})
export class AdminPedidosPageModule {}
