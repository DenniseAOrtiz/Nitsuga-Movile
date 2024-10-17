import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss'],
})
export class AddProductModalComponent {
  nombre: string = '';
  descripcion: string = '';
  precio: number | null = null;
  imagen: string = '';
  categoriaId: number;

  constructor(private modalController: ModalController, private navParams: NavParams, private dbService: DbService) {
    this.categoriaId = this.navParams.get('categoriaId');
  }

  dismiss() {
    this.modalController.dismiss();
  }

  addProduct() {
    const nuevoPrecio = this.precio ?? 0; 
    this.dbService.addProducto(this.nombre, this.descripcion, nuevoPrecio, this.imagen, this.categoriaId);
    this.modalController.dismiss();
  }
}
