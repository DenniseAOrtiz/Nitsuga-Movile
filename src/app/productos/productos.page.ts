import { Component } from '@angular/core';
import { ProdService } from '../services/prod.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage {
  constructor(private prodService: ProdService) {}

  async agregarCategoria() {
    const nombreCategoria = 'Electrónica'; // Cambia según sea necesario
    const descripcion = 'Productos electrónicos'; // Cambia según sea necesario
    const result = await this.prodService.addCategoria(nombreCategoria, descripcion);
    if (result) {
      console.log('Categoría agregada');
    }
  }

  async agregarProducto() {
    const nombreProducto = 'Teléfono'; // Cambia según sea necesario
    const precioProducto = 299.99; // Cambia según sea necesario
    const categoriaId = 1; // ID de la categoría a la que pertenece el producto
    const imagen = 'ruta/a/la/imagen'; // Cambia según sea necesario
    const result = await this.prodService.addProducto(nombreProducto, precioProducto, categoriaId, imagen);
    if (result) {
      console.log('Producto agregado');
    }
  }

  async obtenerCategorias() {
    const categorias = await this.prodService.getCategorias();
    console.log(categorias);
  }

  async obtenerProductos() {
    const productos = await this.prodService.getProductos();
    console.log(productos);
  }
}
