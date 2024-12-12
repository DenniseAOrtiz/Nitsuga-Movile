import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  @Input() orderId!: number; 
  orderDetails: any = null;
  estado: number = 0;
  isLoading: boolean = true;

  constructor(private dbService: DbService, private modalController: ModalController) {}

  async ngOnInit() {
    await this.loadOrderDetails();
  }

  async loadOrderDetails() {
    try {
      this.isLoading = true;
  
      const allOrders = await this.dbService.getOrders();
      this.orderDetails = allOrders.find((order: any) => order.id === this.orderId);
  
      if (this.orderDetails) {
        const products = await this.dbService.getOrderDetails(this.orderId);
        this.orderDetails.productos = products;
  
      } else {
        console.error('Pedido no encontrado');
      }
    } catch (error) {
      console.error('Error al cargar detalles del pedido:', error);
    } finally {
      this.isLoading = false;
    }
  }

  getEstadoTexto(estado: number): string {
    switch (estado) {
      case 0:
        return 'En preparación';
      case 1:
        return 'Entregado';
      case 2:
        return 'Cancelado';
      default:
        return 'Desconocido';
    }
  }

  async cancelOrder() {
    try {
      this.orderDetails.estado = 2; 
      await this.dbService.updateOrderStatus(this.orderId, this.orderDetails.estado); 
  
      this.modalController.dismiss({
        orderId: this.orderId,
        newEstado: this.orderDetails.estado,
      });
    } catch (error) {
      console.error('Error al cancelar el pedido:', error);
    }
  }
  


  closeModal() {
    this.modalController.dismiss();
    this.dbService.emitOrderStateChange(this.orderId, this.orderDetails.estado);
  }
}
