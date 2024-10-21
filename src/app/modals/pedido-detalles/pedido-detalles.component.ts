import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pedido-detalles',
  templateUrl: './pedido-detalles.component.html',
  styleUrls: ['./pedido-detalles.component.scss'],
})
export class PedidoDetallesComponent {

  @Input() pedido: any;

  constructor(private modalCtrl: ModalController) {}

  cerrarModal() {
    this.modalCtrl.dismiss();
  }
}
