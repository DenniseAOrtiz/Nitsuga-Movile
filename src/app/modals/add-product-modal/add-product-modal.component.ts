import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { DbService } from '../../services/db.service';
import { LoadingController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { EditPhotoProdComponent } from '../edit-photo-prod/edit-photo-prod.component';

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
  imagen: string | null = null;
  stock: number = 0;

  constructor(private modalController: ModalController,
    private navParams: NavParams,
    private dbService: DbService,
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
    if (this.nombre && this.descripcion && this.precio && this.imagen && this.stock && this.categoriaId) {
      if (this.precio <= 0) {
        alert('El precio debe ser un valor positivo.');
        return;
      }
      const result = await this.dbService.addProducto(this.nombre, this.descripcion, this.precio, this.imagen, this.stock, this.categoriaId);
      if (result.success) {
        this.modalController.dismiss({ success: true });
      }
    } else {
      alert('Por favor, complete todos los campos.');
    }
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

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      duration: 500,
    });

    loading.present();
  }
}





