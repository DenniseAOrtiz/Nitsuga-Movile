import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { DbService } from '../../services/db.service'; 

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.scss'],
})
export class EditProductModalComponent implements OnInit {
  producto: any; 
  nuevoNombre: string = '';
  nuevaDescripcion: string = '';
  nuevoPrecio: number | null = null;
  nuevaImagen: string = '';
  categoriaId: number | null = null;
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private dbService: DbService

  ) {}

  ngOnInit() {
    this.producto = this.navParams.get('producto');
    this.nuevoNombre = this.producto.nombre;
    this.nuevaDescripcion = this.producto.descripcion;
    this.nuevoPrecio = this.producto.precio;
    this.nuevaImagen = this.producto.imagen;
    this.categoriaId = this.producto.categoriaId;
  }

  async guardarCambios() {
    const precio = this.nuevoPrecio ?? 0;
    await this.dbService.editarProducto(this.producto.id, this.nuevoNombre, this.nuevaDescripcion, precio, this.nuevaImagen, this.producto.categoriaId);
    this.modalController.dismiss({ updated: true });  

  }

  cerrarModal() {
    this.modalController.dismiss();
  }
}
