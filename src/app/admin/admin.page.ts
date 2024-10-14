import { Component, OnInit } from '@angular/core';
import { ProdService } from '../services/prod.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  categorias: any[] = [];
  productos: any[] = [];
  nuevaCategoria: string = '';
  nuevoProductoNombre: string = '';
  nuevoProductoPrecio: number | null = null;
  nuevoProductoImagen: string = ''; 
  categoriaSeleccionada: number | null = null;
  categoriaEdicion: { id: number, nombre: string } | null = null;
  productoEdicion: { id: number, nombre: string, precio: number, imagen: string } | null = null;

  constructor(private prodService: ProdService) {}

  async ngOnInit() {
    this.categorias = await this.prodService.getCategorias();
    this.productos = await this.prodService.getProductos();
  }

  async agregarCategoria() {
    await this.prodService.addCategoria(this.nuevaCategoria);
    this.nuevaCategoria = '';
    this.categorias = await this.prodService.getCategorias();
  }

  async agregarProducto() {
    if (this.nuevoProductoNombre && this.nuevoProductoPrecio !== null && this.categoriaSeleccionada !== null && this.nuevoProductoImagen) {
      await this.prodService.addProducto(this.nuevoProductoNombre, this.nuevoProductoPrecio, this.categoriaSeleccionada, this.nuevoProductoImagen);
      this.nuevoProductoNombre = '';
      this.nuevoProductoPrecio = null;
      this.nuevoProductoImagen = ''; 
      this.categoriaSeleccionada = null;
      this.productos = await this.prodService.getProductos();
    }
  }

  async modificarProducto() {
    if (this.productoEdicion) {
      await this.prodService.updateProducto(this.productoEdicion.id, this.productoEdicion.nombre, this.productoEdicion.precio, this.productoEdicion.imagen);
      this.productoEdicion = null; 
      this.productos = await this.prodService.getProductos();
    }
  }

  async eliminarCategoria(id: number) {
    await this.prodService.deleteCategoria(id);
    this.categorias = await this.prodService.getCategorias();
  }

  async eliminarProducto(id: number) {
    await this.prodService.deleteProducto(id);
    this.productos = await this.prodService.getProductos();
  }
}
