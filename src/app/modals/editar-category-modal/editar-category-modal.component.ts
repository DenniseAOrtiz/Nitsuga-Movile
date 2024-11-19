import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { DbService } from '../../services/db.service';
import { LoadingController } from '@ionic/angular';
import { EditPhotoCatComponent } from '../edit-photo-cat/edit-photo-cat.component';

@Component({
  selector: 'app-editar-category-modal',
  templateUrl: './editar-category-modal.component.html',
  styleUrls: ['./editar-category-modal.component.scss'],
})
export class EditarCategoryModalComponent implements OnInit {
  categoria: any; 
  imagen: string | null = null;
  nuevoNombre: string = '';
  nuevaDescripcion: string = '';
  nuevaImagen: string | null = null;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private dbService: DbService,
    private loadingCtrl: LoadingController,
  ) {}

  ngOnInit() {
    this.categoria = this.navParams.get('categoria');
    this.nuevoNombre = this.categoria.nombre;
    this.nuevaDescripcion = this.categoria.descripcion;
    this.imagen = this.categoria.imagen;
    this.nuevaImagen = this.categoria.imagen; 
  }

  dismiss() {
    this.modalController.dismiss();
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

  async guardarCambios() {
    await this.dbService.editarCategoria(this.categoria.id, this.nuevoNombre, this.nuevaDescripcion, this.imagen ?? '');
    this.modalController.dismiss({ updated: true });
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      duration: 500,
    });

    loading.present();
  }

  cerrarModal() {
    this.modalController.dismiss();
  }
}
