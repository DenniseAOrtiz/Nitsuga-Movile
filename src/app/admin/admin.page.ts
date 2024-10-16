import { Component, OnInit } from '@angular/core';
import { ProdService } from '../services/prod.service';
import { ModalController, AlertController } from '@ionic/angular';
import { AddCategoryModalComponent } from '../modals/add-category-modal/add-category-modal.component';
import { AddProductModalComponent } from '../modals/add-product-modal/add-product-modal.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  categorias: any[] = [];
  productos: any[] = [];

  constructor(private prodService: ProdService, private modalController: ModalController, private alertController: AlertController) {}

  async ngOnInit() {
    this.categorias = await this.prodService.getCategorias();
  }

  async agregarCategoria() {
    const modal = await this.modalController.create({
      component: AddCategoryModalComponent,
    });

    modal.onDidDismiss().then(async (result) => {
      if (result.data) {
        await this.prodService.addCategoria(result.data.nombre, result.data.descripcion);
        this.categorias = await this.prodService.getCategorias();
      }
    });

    return await modal.present();
  }

  async eliminarCategoria(id: number) {
    const alert = await this.alertController.create({
      header: '¿Estás seguro?',
      message: '¿Quieres eliminar esta categoría?',
      buttons: [
        {
          text: 'No, cancelar',
          role: 'cancel',
        },
        {
          text: 'Sí, eliminar',
          handler: async () => {
            await this.prodService.deleteCategoria(id);
            this.categorias = await this.prodService.getCategorias();
          },
        },
      ],
    });

    await alert.present();
  }

  async verProductos(categoriaId: number) {
    // Aquí podrías redirigir a la página de productos por categoría
    // Por ejemplo, usando un router
  }

  async agregarProducto(categoriaId: number) {
    const modal = await this.modalController.create({
      component: AddProductModalComponent,
      componentProps: { categoriaId }
    });

    modal.onDidDismiss().then(async () => {
      this.productos = await this.prodService.getProductos();
    });

    return await modal.present();
  }
}
