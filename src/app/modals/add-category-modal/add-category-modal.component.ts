import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DbService } from '../../services/db.service';
import { LoadingController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { EditPhotoCatComponent } from '../edit-photo-cat/edit-photo-cat.component';

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


  // takePhoto() {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //     sourceType: this.camera.PictureSourceType.CAMERA // Tomar foto con la cámara
  //   };

  //   this.camera.getPicture(options).then(
  //     (imageData) => {
  //       // Convertir la imagen a base64
  //       this.selectedImage = 'data:image/jpeg;base64,' + imageData;
  //       console.log('Foto tomada:', this.selectedImage);
  //     },
  //     (err) => {
  //       console.error('Error al tomar la foto', err);
  //     }
  //   );
  // }

  // chooseFromGallery() {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY // Elegir desde la galería
  //   };

  //   this.camera.getPicture(options).then(
  //     (imageData) => {
  //       // Convertir la imagen a base64
  //       this.selectedImage = 'data:image/jpeg;base64,' + imageData;
  //       console.log('Imagen seleccionada de la galería:', this.selectedImage);
  //     },
  //     (err) => {
  //       console.error('Error al seleccionar la imagen', err);
  //     }
  //   );
  // }

  // // Función para mostrar opciones de tomar foto o elegir de galería
  // async selectImage() {
  //   const actionSheet = await this.actionSheetCtrl.create({
  //     header: 'Elige una opción',
  //     buttons: [
  //       {
  //         text: 'Tomar una foto',
  //         icon: 'camera',
  //         handler: () => {
  //           this.takePhoto(); // Llamar a la función para tomar una foto
  //         }
  //       },
  //       {
  //         text: 'Seleccionar de la galería',
  //         icon: 'images',
  //         handler: () => {
  //           this.chooseFromGallery(); // Llamar a la función para seleccionar de la galería
  //         }
  //       },
  //       {
  //         text: 'Cancelar',
  //         icon: 'close',
  //         role: 'cancel'
  //       }
  //     ]
  //   });

  //   await actionSheet.present();
  // }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      duration: 500,
    });

    loading.present();
  }

}
