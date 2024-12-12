import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import { OrderDetailsComponent } from '../modals/order-details/order-details.component';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.page.html',
  styleUrls: ['./mis-pedidos.page.scss'],
})
export class MisPedidosPage implements OnInit {
  pedidos: any[] = [];
  isLoading: boolean = true;
  

  constructor(private dbService: DbService, private modalController: ModalController, private router: Router, private navCtrl: NavController) {}

  async ngOnInit() {
    await this.loadPedidos();
  }

  async loadPedidos() {
    this.isLoading = true;
    try {
      const username = this.dbService.getUsername(); 
      if (username) {
        this.pedidos = await this.dbService.getOrders(); 
        this.pedidos = this.pedidos.filter((pedido) => pedido.username === username);
      } else {
        alert('No se pudo cargar la información del usuario. Por favor, inicia sesión nuevamente.');
      }
    } catch (error) {
      console.error('Error al cargar pedidos:', error);
    } finally {
      this.isLoading = false;
    }
  }

  getEstadoTexto(estado: number): string {
    switch (estado) {
      case 0: return 'En preparación';
      case 1: return 'Entregado';
      case 2: return 'Cancelado';
      default: return 'Desconocido';
    }
  }

  async viewDetails(orderId: number) {
    const modal = await this.modalController.create({
      component: OrderDetailsComponent,
      componentProps: { orderId },
    });
  
    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.orderId) {
        const pedidoIndex = this.pedidos.findIndex((pedido) => pedido.id === result.data.orderId);
        if (pedidoIndex !== -1) {
          this.pedidos[pedidoIndex].estado = result.data.newEstado; 
        }
      }
    });
  
    await modal.present();
  }
  

  volverCliente() {
    this.navCtrl.navigateBack('/homes'); 
  }
}
