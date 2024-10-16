import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-add-category-modal',
  templateUrl: './add-category-modal.component.html',
  styleUrls: ['./add-category-modal.component.scss'],
})

export class AddCategoryModalComponent {
  nombre: string = '';
  descripcion: string = '';
  imagen: string = '';

  constructor(private modalController: ModalController, private dbService: DbService) {}

  addCategory() {
    this.dbService.addCategoria(this.nombre, this.descripcion, this.imagen);
    this.modalController.dismiss({ data: { nombre: this.nombre, descripcion: this.descripcion, imagen: this.imagen } });
  }
  dismiss() {
    this.modalController.dismiss();
    this.dbService.getCategorias();
  }
}
