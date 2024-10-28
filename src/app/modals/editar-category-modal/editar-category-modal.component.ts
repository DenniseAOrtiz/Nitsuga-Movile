import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { DbService } from '../../services/db.service';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

@Component({
  selector: 'app-editar-category-modal',
  templateUrl: './editar-category-modal.component.html',
  styleUrls: ['./editar-category-modal.component.scss'],
})
export class EditarCategoryModalComponent implements OnInit {
  categoria: any; 
  nuevoNombre: string = '';
  nuevaDescripcion: string = '';
  nuevaImagen: string = '';

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private dbService: DbService,
    private camera: Camera // Agrega el servicio de cámara aquí
  ) {}

  ngOnInit() {
    this.categoria = this.navParams.get('categoria');
    this.nuevoNombre = this.categoria.nombre;
    this.nuevaDescripcion = this.categoria.descripcion;
    this.nuevaImagen = this.categoria.imagen; 
  }

  // Método para abrir la cámara
  async tomarFoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL, // Obtiene la imagen como base64
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: true,
      targetWidth: 300,
      targetHeight: 300,
      saveToPhotoAlbum: false
    };

    this.camera.getPicture(options).then((imageData) => {
      this.nuevaImagen = 'data:image/jpeg;base64,' + imageData; // Guarda la imagen en base64
    }, (err) => {
      console.log('Error al tomar la foto: ', err);
    });
  }

  async guardarCambios() {
    await this.dbService.editarCategoria(this.categoria.id, this.nuevoNombre, this.nuevaDescripcion, this.nuevaImagen);
    this.modalController.dismiss({ updated: true });
  }

  cerrarModal() {
    this.modalController.dismiss();
  }
}
