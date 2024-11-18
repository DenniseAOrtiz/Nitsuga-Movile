import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  @Input() orderId!: number; // ID del pedido recibido como entrada
  orderDetails: any = null;
  isLoading: boolean = true;

  constructor(private dbService: DbService, private modalController: ModalController) {}

  async ngOnInit() {
    await this.loadOrderDetails();
  }

  async loadOrderDetails() {
    try {
      this.isLoading = true;
      const allOrders = await this.dbService.getOrders(); // Obtiene todos los pedidos
      this.orderDetails = allOrders.find((order: any) => order.id === this.orderId);

      if (!this.orderDetails) {
        console.error('Pedido no encontrado');
      }
    } catch (error) {
      console.error('Error al cargar detalles del pedido:', error);
    } finally {
      this.isLoading = false;
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
