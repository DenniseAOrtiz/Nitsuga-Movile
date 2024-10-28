import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss'],
})
export class AddProductModalComponent implements OnInit {
  categorias: any[] = [];
  nombre: string = '';
  descripcion: string = '';
  precio: number = 0;
  categoriaId: number | null = null; 
  imagen: string = '';

  constructor(private modalController: ModalController, private navParams: NavParams, private dbService: DbService) {
    this.categoriaId = this.navParams.get('categoriaId');
  }

  async ngOnInit() {
    this.categorias = await this.dbService.getCategorias();
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async addProduct() {
    if (this.nombre && this.descripcion && this.precio && this.categoriaId) {
      if (this.precio <= 0) {
        alert('El precio debe ser un valor positivo.');
        return;
      }
      const result = await this.dbService.addProducto(this.nombre, this.descripcion, this.precio, this.imagen, this.categoriaId);
      if (result.success) {
        this.modalController.dismiss({ success: true });
      }
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }
}
