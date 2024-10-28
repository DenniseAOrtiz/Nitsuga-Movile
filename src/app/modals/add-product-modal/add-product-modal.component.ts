import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { DbService } from '../../services/db.service';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { LoadingController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';

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
  imagenCapturada: any = '';
  selectedImage: string | null = null;
  imagen: string = '';


  constructor(private modalController: ModalController,
    private navParams: NavParams,
    private dbService: DbService,
    private camera: Camera,
    private loadingCtrl: LoadingController,
    private actionSheetCtrl: ActionSheetController) {
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

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA // Tomar foto con la cámara
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        // Convertir la imagen a base64
        this.selectedImage = 'data:image/jpeg;base64,' + imageData;
        console.log('Foto tomada:', this.selectedImage);
      },
      (err) => {
        console.error('Error al tomar la foto', err);
      }
    );
  }

 
  chooseFromGallery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY // Elegir desde la galería
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        // Convertir la imagen a base64
        this.selectedImage = 'data:image/jpeg;base64,' + imageData;
        console.log('Imagen seleccionada de la galería:', this.selectedImage);
      },
      (err) => {
        console.error('Error al seleccionar la imagen', err);
      }
    );
  }

  // Función para mostrar opciones de tomar foto o elegir de galería
  async selectImage() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Elige una opción',
      buttons: [
        {
          text: 'Tomar una foto',
          icon: 'camera',
          handler: () => {
            this.takePhoto(); // Llamar a la función para tomar una foto
          }
        },
        {
          text: 'Seleccionar de la galería',
          icon: 'images',
          handler: () => {
            this.chooseFromGallery(); // Llamar a la función para seleccionar de la galería
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      duration: 500,
    });

    loading.present();
  }
}





