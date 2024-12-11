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
  estado: number = 0; 

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

  getEstadoTexto(estado: number): string {
    switch (estado) {
      case 0: return 'En preparación';
      case 1: return 'Entregado';
      case 2: return 'Cancelado';
      default: return 'Desconocido';
    }
  }

  volverAdmin() {
    this.router.navigate(['admin']);
  }

  async deleteOrder(id: number) {
    await this.dbService.deleteOrder(id);
    this.loadPedidos();
  }

  async verDetalles(orderId: number) {
    const modal = await this.modalCtrl.create({
      component: PedidoDetallesComponent,
      componentProps: { orderId: orderId },
    });
  
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        const pedidoIndex = this.pedidos.findIndex((pedido) => pedido.id === orderId);
        if (pedidoIndex !== -1) {
          this.pedidos[pedidoIndex].estado = result.data.newEstado;
        }
      }
    });
  
    return await modal.present();
  }
  

}
