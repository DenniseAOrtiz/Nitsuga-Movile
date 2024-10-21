import { Injectable } from '@angular/core';
import { SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { DbService } from './db.service'; // Asegúrate de tener acceso a tu DbService

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private dbInstance!: SQLiteObject;

  constructor(private dbService: DbService) {
    this.initializeDB();
  }

  // Inicializar la base de datos obteniendo la instancia desde DbService
  private async initializeDB() {
    this.dbInstance = await this.dbService.getDBInstance();
  }

  // Agregar producto al carrito
  public async addToCart(producto: any): Promise<any> {
    try {
      // Verificar si el producto ya está en el carrito
      const result = await this.dbInstance.executeSql(
        `SELECT * FROM cart WHERE productoId = ?`,
        [producto.id]
      );

      if (result.rows.length > 0) {
        // Si ya existe, incrementamos la cantidad
        const currentItem = result.rows.item(0);
        const nuevaCantidad = currentItem.cantidad + 1;
        await this.dbInstance.executeSql(
          `UPDATE cart SET cantidad = ? WHERE productoId = ?`,
          [nuevaCantidad, producto.id]
        );
      } else {
        // Si no existe, lo agregamos con cantidad 1
        await this.dbInstance.executeSql(
          `INSERT INTO cart (productoId, nombre, descripcion, precio, cantidad, imagen) VALUES (?, ?, ?, ?, ?, ?)`,
          [producto.id, producto.nombre, producto.descripcion, producto.precio, 1, producto.imagen]
        );
      }
      return { success: true };
    } catch (error) {
      console.error('Error al agregar producto al carrito', error);
      return { success: false, error };
    }
  }

  // Obtener los productos del carrito
  public async getCartItems(): Promise<any[]> {
    try {
      const result = await this.dbInstance.executeSql('SELECT * FROM cart', []);
      const cartItems = [];
      for (let i = 0; i < result.rows.length; i++) {
        cartItems.push(result.rows.item(i));
      }
      return cartItems;
    } catch (error) {
      console.error('Error al obtener productos del carrito', error);
      return [];
    }
  }

  // Eliminar un producto del carrito
  public async removeFromCart(productoId: number): Promise<any> {
    try {
      await this.dbInstance.executeSql('DELETE FROM cart WHERE productoId = ?', [productoId]);
      return { success: true };
    } catch (error) {
      console.error('Error al eliminar producto del carrito', error);
      return { success: false, error };
    }
  }

  // Vaciar el carrito
  public async clearCart(): Promise<any> {
    try {
      await this.dbInstance.executeSql('DELETE FROM cart', []);
      return { success: true };
    } catch (error) {
      console.error('Error al vaciar el carrito', error);
      return { success: false, error };
    }
  }

  // Obtener el total del carrito (suma de precios)
  public async getCartTotal(): Promise<number> {
    try {
      const result = await this.dbInstance.executeSql('SELECT SUM(precio * cantidad) AS total FROM cart', []);
      if (result.rows.length > 0) {
        return result.rows.item(0).total;
      } else {
        return 0;
      }
    } catch (error) {
      console.error('Error al calcular el total del carrito', error);
      return 0;
    }
  }
}
