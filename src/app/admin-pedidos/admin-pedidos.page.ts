import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import { Router } from '@angular/router';
import { PedidoDetallesComponent } from '../modals/pedido-detalles/pedido-detalles.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-admin-pedidos',
  templateUrl: './admin-pedidos.page.html',
  styleUrls: ['./admin-pedidos.page.scss'],
})
export class AdminPedidosPage implements OnInit {
  pedidos: any[] = [];

  constructor(
    private dbService: DbService, 
    private router: Router, 
    private modalCtrl: ModalController
  ) { }

  async ngOnInit() {
    this.pedidos = await this.dbService.getOrders();
  }

  async loadPedidos() {
    this.pedidos = await this.dbService.getOrders();
  }

  volverAdmin() {
    this.router.navigate(['admin']);
  }

  async deleteOrder(id: number) {
    await this.dbService.deleteOrder(id);
    this.loadPedidos();
  }

  async verDetalles(pedidoId: number) {
    const pedidoDetalles = await this.dbService.getOrderDetails(pedidoId);

    const modal = await this.modalCtrl.create({
      component: PedidoDetallesComponent,
      componentProps: { pedido: pedidoDetalles }
    });

    return await modal.present();
  }

}
