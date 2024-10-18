import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '../../services/db.service';
import { ModalController } from '@ionic/angular';
import { AddProductModalComponent } from '../../modals/add-product-modal/add-product-modal.component';
import { EditProductModalComponent } from '../../modals/edit-product-modal/edit-product-modal.component';


@Component({
  selector: 'app-admin-prod',
  templateUrl: './admin-prod.page.html',
  styleUrls: ['./admin-prod.page.scss'],
})
export class AdminProdPage implements OnInit {
  productos: any[] = [];
  categoriaId: number | null = null;
  edicionProducto: { id: number; nombre: string; descripcion: string; precio: number; imagen: string } | null = null;

  constructor(private route: ActivatedRoute, private dbService: DbService, private modalController: ModalController) {}

  async ngOnInit() {
    this.categoriaId = Number(this.route.snapshot.paramMap.get('id'));
    await this.loadProductos();
  }

  async loadProductos() {
    this.productos = await this.dbService.getProductos();
    this.productos = this.productos.filter(producto => producto.categoriaId === this.categoriaId);
  }

  async agregarProducto() {
    const modal = await this.modalController.create({
      component: AddProductModalComponent,
      componentProps: { categoriaId: this.categoriaId }
    });
    await modal.present();
  }

  async editarProducto(producto: any) {
    const modal = await this.modalController.create({
      component: EditProductModalComponent,
      componentProps: { producto }
    });
  }

  async eliminarProducto(productoId: number) {
    await this.dbService.deleteProducto(productoId);
    await this.loadProductos();
  }
}