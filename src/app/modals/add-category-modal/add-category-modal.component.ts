import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DbService } from '../../services/db.service';
import { LoadingController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-add-category-modal',
  templateUrl: './add-category-modal.component.html',
  styleUrls: ['./add-category-modal.component.scss'],
})

export class AddCategoryModalComponent {
  id: number = 0;
  nombre: string = '';
  descripcion: string = '';
  imagenCapturada: any = '';
  selectedImage: string | null = null;
  imagen: string = '';


  constructor(private modalController: ModalController, private dbService: DbService,
    private loadingCtrl: LoadingController,
    private actionSheetCtrl: ActionSheetController) {}

  addCategory() {
    this.dbService.addCategoria(this.id, this.nombre, this.descripcion, this.imagen);
    this.modalController.dismiss({ data: { nombre: this.nombre, descripcion: this.descripcion, imagen: this.imagen } });
  }
  dismiss() {
    this.modalController.dismiss();
    this.dbService.getCategorias();
  }


  async showLoading() {
    const loading = await this.loadingCtrl.create({
      duration: 500,
    });

    loading.present();
  }

}
