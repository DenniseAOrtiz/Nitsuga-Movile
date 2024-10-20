import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DbService } from '../services/db.service';
import { ModalController, AlertController } from '@ionic/angular';
import { AddCategoryModalComponent } from '../modals/add-category-modal/add-category-modal.component';
import { AddProductModalComponent } from '../modals/add-product-modal/add-product-modal.component';
import { Router } from '@angular/router';
import { EditarCategoryModalComponent } from '../modals/editar-category-modal/editar-category-modal.component';
import { async } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-admin-cat',
  templateUrl: './admin-cat.page.html',
  styleUrls: ['./admin-cat.page.scss'],
})
export class AdminCatPage implements OnInit {
  categorias: any[] = [];
  productos: any[] = [];
  categoriaEdicion: { id: number; nombre: string; descripcion: string; imagen: string } | null = null;
  nombreUsuario: string | null = null;


  constructor(private dbService: DbService, 
    private modalController: ModalController, 
    private alertController: AlertController, 
    private router: Router, 
    private loadingCtrl: LoadingController,
    private cd: ChangeDetectorRef,
    private authService: AuthService) { }

  async ngOnInit() {
    this.categorias = await this.dbService.getCategorias();
    this.productos = await this.dbService.getProductos();
    this.nombreUsuario = this.dbService.getUsername();
    // Cargar las categorías y productos al iniciar la página
    await this.loadCategorias();
    await this.loadProductos();
  }

  // Función que recarga la lista de categorías
  async recargarCategorias() {
    await this.loadCategorias();
  }
  // Método para cargar categorías
  async loadCategorias() {
    this.categorias = await this.dbService.getCategorias();
    this.cd.detectChanges(); // Forzar la detección de cambios
  }

  // Método para cargar productos
  async loadProductos() {
    this.productos = await this.dbService.getProductos();
    this.cd.detectChanges();
  }

  // Refresca las categorías al regresar a la página
  ionViewWillEnter() {
    this.loadCategorias();
  }

  async editarCategoria(categoria: any) {
    const modal = await this.modalController.create({
      component: EditarCategoryModalComponent,
      componentProps: { categoria }
    });

    modal.onDidDismiss().then(async (result) => {
      if (result.data && result.data.updated) {
        this.categorias = await this.dbService.getCategorias();
      }
    });

    return await modal.present();
  }


  async addCategory() {
    const modal = await this.modalController.create({
      component: AddCategoryModalComponent,
    });

    modal.onDidDismiss().then(async (result) => {
      if (result.data && result.data.nombre) {
        this.categorias = await this.dbService.getCategorias();
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
            await this.dbService.deleteCategoria(id);
            this.categorias = await this.dbService.getCategorias();
          },
        },
      ],
    });

    await alert.present();
  }

  async verProductos(categoriaId: number) {
    console.log(categoriaId);
    this.router.navigate(['/admin-prod', categoriaId]);

  }

  async agregarProducto(categoriaId: number) {
    const modal = await this.modalController.create({
      component: AddProductModalComponent,
      componentProps: { categoriaId }
    });

    modal.onDidDismiss().then(async () => {
      this.productos = await this.dbService.getProductos();
    });

    return await modal.present();
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      duration: 500,
    });

    loading.present();
  }

  logout() {
    this.authService.logout(); // Ejecuta la lógica de cierre de sesión
    this.router.navigate(['/login']); 
  }

  volverAdmin() {
    this.router.navigate(['/admin']);
  }
}
