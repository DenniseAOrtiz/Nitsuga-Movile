import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ProdService {
  private dbInstance!: SQLiteObject;

  constructor(private sqlite: SQLite, private platform: Platform) {
    this.platform.ready().then(() => {
      this.createDB();
    });
  }

  // Creación de la base de datos y tablas
  private async createDB() {
    try {
      const db = await this.sqlite.create({
        name: 'prod.db',
        location: 'default'
      });
      this.dbInstance = db;

      // Crear tabla de categorías
      await this.dbInstance.executeSql(
        `CREATE TABLE IF NOT EXISTS categorias (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT UNIQUE
        )`,
        []
      );

      // Crear tabla de productos
      await this.dbInstance.executeSql(
        `CREATE TABLE IF NOT EXISTS productos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          imagen TEXT,
          nombre TEXT,
          precio REAL,
          categoria_id INTEGER,
          FOREIGN KEY (categoria_id) REFERENCES categorias (id)
        )`,
        []
      );

      console.log('Base de datos creada y tablas de productos y categorías listas');
    } catch (error) {
      console.error('No se pudo crear la base de datos', error);
    }
  }

  // Método para agregar una categoría
  public async addCategoria(nombre: string, descripcion: string): Promise<boolean> {
    try {
      await this.dbInstance.executeSql(
        `INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)`,
        [nombre, descripcion]
      );
      return true;
    } catch (error) {
      console.error('Error al agregar la categoría', error);
      return false;
    }
  }

  // Método para agregar un producto
  public async addProducto(nombre: string, precio: number, categoriaId: number, imagen: string): Promise<boolean> {
    try {
      await this.dbInstance.executeSql(
        `INSERT INTO productos (nombre, precio, categoria_id, imagen) VALUES (?, ?, ?, ?)`,
        [nombre, precio, categoriaId, imagen]
      );
      return true;
      
    } catch (error) {
      console.error('Error al agregar el producto', error);
      return false;
    }
  }

  async updateCategoria(id: number, nuevoNombre: string): Promise<boolean> {
    try {
      await this.dbInstance.executeSql(
        `UPDATE categorias SET nombre = ? WHERE id = ?`,
        [nuevoNombre, id]
      );
      return true;
    } catch (error) {
      console.error('Error al modificar la categoría', error);
      return false;
    }
  }

  async deleteCategoria(id: number): Promise<boolean> {
    try {
      await this.dbInstance.executeSql(
        `DELETE FROM categorias WHERE id = ?`,
        [id]
      );
      return true;
    } catch (error) {
      console.error('Error al eliminar la categoría', error);
      return false;
    }
  }

  async updateProducto(id: number, nuevoNombre: string, nuevoPrecio: number, nuevaImagen: string): Promise<boolean> {
    try {
      await this.dbInstance.executeSql(
        `UPDATE productos SET nombre = ?, precio = ?, imagen = ? WHERE id = ?`,
        [nuevoNombre, nuevoPrecio, nuevaImagen, id]
      );
      return true;
    } catch (error) {
      console.error('Error al modificar el producto', error);
      return false;
    }
  }

  async deleteProducto(id: number): Promise<boolean> {
    try {
      await this.dbInstance.executeSql(
        `DELETE FROM productos WHERE id = ?`,
        [id]
      );
      return true;
    } catch (error) {
      console.error('Error al eliminar el producto', error);
      return false;
    }
  }
  // Método para obtener todas las categorías
  public async getCategorias(): Promise<any[]> {
    try {
      const result = await this.dbInstance.executeSql(`SELECT * FROM categorias`, []);
      const categorias = [];
      for (let i = 0; i < result.rows.length; i++) {
        categorias.push(result.rows.item(i));
      }
      return categorias;
    } catch (error) {
      console.error('Error al obtener categorías', error);
      return [];
    }
  }

  // Método para obtener todos los productos
  public async getProductos(): Promise<any[]> {
    try {
      const result = await this.dbInstance.executeSql(`SELECT * FROM productos`, []);
      const productos = [];
      for (let i = 0; i < result.rows.length; i++) {
        productos.push(result.rows.item(i));
      }
      return productos;
    } catch (error) {
      console.error('Error al obtener productos', error);
      return [];
    }
  }
}
