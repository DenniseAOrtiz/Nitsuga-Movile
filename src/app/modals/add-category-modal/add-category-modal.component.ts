import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DbService } from '../../services/db.service';
import { LoadingController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { EditPhotoCatComponent } from '../edit-photo-cat/edit-photo-cat.component';
import { Camera, CameraResultType } from '@capacitor/camera';


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
  imagen: string | null = null; 

  constructor(private modalController: ModalController, private dbService: DbService,
    private loadingCtrl: LoadingController,
    private actionSheetCtrl: ActionSheetController) {}

    async addCategory() {
      if (this.nombre && this.descripcion && this.imagen) {
        const result = await this.dbService.addCategoria(this.nombre, this.descripcion, this.imagen);
        if (result.success) {
          this.modalController.dismiss({ success: true }); 
        }
      } else {
        alert('Por favor, complete todos los campos.');
      }
    }
    

  dismiss(data: any = null) {
    this.modalController.dismiss(data);
  }

  async openEditPhotoModal() {
    const modal = await this.modalController.create({
      component: EditPhotoCatComponent,
      componentProps: { imagen: this.imagen }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.imagen = data;
    }
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      duration: 500,
    });

    loading.present();
  }

}
