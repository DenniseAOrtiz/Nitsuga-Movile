import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { DbService } from '../../services/db.service'; 
import { LoadingController } from '@ionic/angular';
import { EditPhotoProdComponent } from '../edit-photo-prod/edit-photo-prod.component';

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.scss'],
})
export class EditProductModalComponent implements OnInit {
  producto: any; 
  categorias: any[] = [];
  imagen: string | null = null;
  nuevoNombre: string = '';
  nuevaDescripcion: string = '';
  nuevoPrecio: number | null = null;
  nuevaImagen: string | null = null;
  categoriaId: number | null = null;
  nuevoStock: number | null = null;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private dbService: DbService,
    private loadingCtrl: LoadingController 
  ) {
    this.categoriaId = this.navParams.get('categoriaId');
  }

  async ngOnInit() {
    this.producto = this.navParams.get('producto');
    this.nuevoNombre = this.producto.nombre;
    this.nuevaDescripcion = this.producto.descripcion;
    this.nuevoPrecio = this.producto.precio;
    this.imagen = this.producto.imagen;
    this.nuevoStock = this.producto.stock;
    this.categorias = await this.dbService.getCategorias();
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async openEditPhotoModal() {
    const modal = await this.modalController.create({
      component: EditPhotoProdComponent,
      componentProps: { imagen: this.imagen }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.imagen = data;
    }
  }

  
  async guardarCambios() {
    const precio = this.nuevoPrecio ?? 0;
    await this.dbService.editarProducto(this.producto.id, this.nuevoNombre, this.nuevaDescripcion, precio, this.imagen ?? '', this.nuevoStock ?? 0, this.producto.categoriaId);
    this.modalController.dismiss({ updated: true });  
  }
  
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      duration: 500,
    });

    loading.present();
  }

  
}
