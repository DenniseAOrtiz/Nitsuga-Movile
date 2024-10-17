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

  constructor(private modalController: ModalController, private dbService: DbService) {}

  dismiss() {
    this.modalController.dismiss();
  }

  addCategory() {
    this.dbService.addCategoria(this.nombre, this.descripcion);
    this.modalController.dismiss();
  }
}
