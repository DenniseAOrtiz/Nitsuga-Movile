import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '../services/db.service';
import { ModalController } from '@ionic/angular';
import { EditProductModalComponent } from '../modals/edit-product-modal/edit-product-modal.component';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  productos: any[] = [];
  categoriaId: number | null = null;

  constructor(private route: ActivatedRoute, private dbService: DbService, private modalController: ModalController) {}

  async ngOnInit() {
    this.categoriaId = Number(this.route.snapshot.paramMap.get('id'));
    await this.loadProductos();
  }

  async loadProductos() {
    this.productos = await this.dbService.getProductos();
    this.productos = this.productos.filter(producto => producto.categoriaId === this.categoriaId);
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
