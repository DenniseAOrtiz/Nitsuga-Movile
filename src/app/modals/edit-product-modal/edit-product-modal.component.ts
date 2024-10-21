import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { DbService } from '../../services/db.service'; 
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.scss'],
})
export class EditProductModalComponent implements OnInit {
  producto: any; 
  categorias: any[] = [];
  nuevoNombre: string = '';
  nuevaDescripcion: string = '';
  nuevoPrecio: number | null = null;
  nuevaImagen: string = '';
  categoriaId: number | null = null;
  imagenCapturada: string = '';

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private dbService: DbService,
    private camera: Camera,
    private loadingCtrl: LoadingController 
  ) {
    this.categoriaId = this.navParams.get('categoriaId');
  }

  async ngOnInit() {
    this.producto = this.navParams.get('producto');
    this.nuevoNombre = this.producto.nombre;
    this.nuevaDescripcion = this.producto.descripcion;
    this.nuevoPrecio = this.producto.precio;
    this.nuevaImagen = this.producto.imagen;
    this.categorias = await this.dbService.getCategorias();
  }

  dismiss() {
    this.modalController.dismiss();
  }

  
  async guardarCambios() {
    const precio = this.nuevoPrecio ?? 0;
    await this.dbService.editarProducto(this.producto.id, this.nuevoNombre, this.nuevaDescripcion, precio, this.nuevaImagen, this.producto.categoriaId);
    this.modalController.dismiss({ updated: true });  

  }
  async tomarFoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE
    };

    try {
      const imageData = await this.camera.getPicture(options);
      // Convertir la imagen a base64
      this.imagenCapturada = 'data:image/jpeg;base64,' + imageData;
      console.log('Imagen capturada correctamente');
    } catch (err) {
      console.log('Error al tomar la foto', err);
    }
  }
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      duration: 500,
    });

    loading.present();
  }

  
}
