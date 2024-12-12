import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DbService } from '../../services/db.service';
import { UpdateEstadoComponent } from '../update-estado/update-estado.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pedido-detalles',
  templateUrl: './pedido-detalles.component.html',
  styleUrls: ['./pedido-detalles.component.scss'],
})
export class PedidoDetallesComponent implements OnInit, OnDestroy {
  @Input() orderId!: number; 
  orderDetails: any = null;
  estado: number = 0;
  isLoading: boolean = true;
  private orderStateSubscription!: Subscription;
  nuevoEstado!: number;

  constructor(private dbService: DbService, private modalController: ModalController) {}

  async ngOnInit() {
    await this.loadOrderDetails();
    this.orderStateSubscription = this.dbService.orderStateChange$.subscribe((data: any) => {
      if (data && data.orderId === this.orderDetails.id) {
        this.orderDetails.estado = data.newState;
      }
    });
  }

  ngOnDestroy() {
    if (this.orderStateSubscription) {
      this.orderStateSubscription.unsubscribe();
    }
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

  guardarEstado() {
    this.modalController.dismiss({ newEstado: this.nuevoEstado });
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

  async openUpdateEstadoModal() {
    const modal = await this.modalController.create({
      component: UpdateEstadoComponent,
      componentProps: {
        orderId: this.orderDetails.id,
        currentEstado: this.orderDetails.estado, 
      },
    });
  
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.orderDetails.estado = result.data.newEstado; 
      }
    });
  
    return await modal.present();
  }
  

  closeModal() {
    this.modalController.dismiss({
      newEstado: this.orderDetails.estado, 
    });
  }


}
