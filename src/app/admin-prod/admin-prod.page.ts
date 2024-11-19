import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '../services/db.service';
import { ModalController } from '@ionic/angular';
import { AddProductModalComponent } from '../modals/add-product-modal/add-product-modal.component';
import { EditProductModalComponent } from '../modals/edit-product-modal/edit-product-modal.component';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-admin-prod',
  templateUrl: './admin-prod.page.html',
  styleUrls: ['./admin-prod.page.scss'],
})
export class AdminProdPage implements OnInit {
  productos: any[] = [];
  categoriaId: number | null = null;
  edicionProducto: { id: number; nombre: string; descripcion: string; precio: number; imagen: any } | null = null;
  nombreUsuario: string | null = null;
  


  constructor(private route: ActivatedRoute,
    private dbService: DbService,
    private modalController: ModalController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router,
    private navCtrl: NavController) { }

  async ngOnInit() {
    this.categoriaId = Number(this.route.snapshot.paramMap.get('id'));
    this.nombreUsuario = this.dbService.getUsername();
    this.showLoading();
    this.loadProductos();
  }

  async loadProductos() {
    try {
      if (this.categoriaId) {
        this.productos = await this.dbService.getProductosPorCategoria(this.categoriaId);
      } else {
        this.productos = await this.dbService.getProductos();
      }
    } catch (error) {
      console.error('Error al cargar los productos', error);
    }
  }

  async addProduct() {
    const modal = await this.modalController.create({
      component: AddProductModalComponent,
      componentProps: { categoriaId: this.categoriaId }
    });

    modal.onDidDismiss().then(async (result) => {
      if (result.data && result.data.success) {
        const { nombre, descripcion, precio, imagen, categoriaId } = result.data;
        // alert('Añadiendo producto: ' + nombre + ' ' + descripcion + ' ' + precio + ' ' + imagen + ' ' + categoriaId);

        await this.loadProductos();
      }
    });

    await modal.present();
  }

  async editarProducto(producto: any) {
    const modal = await this.modalController.create({
      component: EditProductModalComponent,
      componentProps: { producto }
    });

    modal.onDidDismiss().then(async (result) => {
      if (result.data && result.data.updated) {
        this.productos = await this.dbService.getProductos();
      }
    });

    return await modal.present();
  }

  async eliminarProducto(productoId: number) {
    await this.dbService.deleteProducto(productoId);
    await this.loadProductos();
  }

  async editarStock(producto: any) {
    const newStock = prompt('Ingrese la nueva cantidad en stock:', producto.stock);
    if (newStock !== null) {
      const updatedStock = parseInt(newStock, 10);
      if (!isNaN(updatedStock)) {
        const result = await this.dbService.updateStock(producto.id, updatedStock);
        if (result.success) {
          alert('Stock actualizado correctamente');
          this.loadProductos();
        } else {
          alert('Error al actualizar el stock');
        }
      } else {
        alert('Por favor, ingrese un número válido');
      }
    }
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

  goBack() {
    this.navCtrl.back();
  }

  
}