import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class DbService {
  private dbInstance!: SQLiteObject;
  private currentUsername: string | null = null;
  private currentIsAdmin: number = 0;
  private currentCategoria: string | null = null;
  


  constructor(private sqlite: SQLite, private platform: Platform, private router: Router, private modalController: ModalController) {
    this.platform.ready().then(() => {
      this.createDB();
    });
  }

  // Creación de la base de datos y tablas 
  private async createDB() {
    try {
      const db = await this.sqlite.create({
        name: 'ecommerce.db',
        location: 'default'
      });
      this.dbInstance = db;

      // tabla de usuarios
      await this.dbInstance.executeSql(
        `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          mail TEXT UNIQUE,
          username TEXT UNIQUE,
          password TEXT,
          isAdmin INTEGER DEFAULT 0,
          isBlocked INTEGER DEFAULT 0
        )`,
        []
      );
      // alert('Base de datos creada y tabla de usuarios lista');
    } catch (error) {
      alert('No se pudo crear la base de datos ' + JSON.stringify(error));
    }

    // tabla de categorias
    try {
      await this.dbInstance.executeSql(
        `CREATE TABLE IF NOT EXISTS categorias (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          descripcion TEXT,
          imagen TEXT
        )`, []).then(() => {
          console.log('Tabla categorias creada');
        }).catch(e => console.error(e));
      // alert('Base de datos creada y tabla de categorías lista');
    } catch (error) {
      alert('No se pudo crear la base de datos categorias ' + error);
    }

    // tabla de productos
    try {
      await this.dbInstance.executeSql(
        `CREATE TABLE IF NOT EXISTS productos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          descripcion TEXT,
          precio REAL NOT NULL,
          imagen BLOB,
          categoriaId INTEGER,
          FOREIGN KEY (categoriaId) REFERENCES categorias(id)
      )`, []
      );
      //alert('Base de datos creada y tabla de productos lista');
    } catch (error) {
      alert('No se pudo crear la tabla de productos: ' + JSON.stringify(error));
    }

    // tabla de carrito de compras
    try {
      await this.dbInstance.executeSql(
        `CREATE TABLE IF NOT EXISTS cart (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          productoId INTEGER,
          nombre TEXT,
          descripcion TEXT,
          precio REAL,
          cantidad INTEGER,
          imagen TEXT,
          FOREIGN KEY (productoId) REFERENCES productos(id)
        )`,
        []
      );
      //alert('Tabla de carrito de compras creada');
    } catch (error) {
      alert('No se pudo crear la tabla de carrito: ' + JSON.stringify(error));
    }

    // tabla de pedidos
    try {
      await this.dbInstance.executeSql(
        `CREATE TABLE IF NOT EXISTS orders (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT,
          total REAL,
          fecha TEXT,
          productos TEXT
        )`,
        []
      );
      //alert('Tabla de pedidos creada');
    } catch (error) {
      alert('No se pudo crear la tabla de pedidos: ' + JSON.stringify(error));
    }

    // tabla de productos por pedido
    try {
      await this.dbInstance.executeSql(
        `CREATE TABLE IF NOT EXISTS order_items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          orderId INTEGER,
          productoId INTEGER,
          nombre TEXT,
          cantidad INTEGER,
          precio REAL,
          FOREIGN KEY (orderId) REFERENCES orders(id),
          FOREIGN KEY (productoId) REFERENCES productos(id)
        )`, []
      );
      //alert('Tabla de productos por pedido creada correctamente');
    } catch (error) {
      alert('Error al crear la tabla de productos por pedido: ' + JSON.stringify(error));
    }

  }

  // //////////////////////////////////////////////////////////////////////////
// USUARIOS //////////////////////////////////////////////////////////////////

  public getDBInstance(): Promise<SQLiteObject> {
    return Promise.resolve(this.dbInstance);
  }

  // Registro de un nuevo usuario
  public async register(mail: string, username: string, password: string, isAdmin: number) {
    const passwordRegex = /^(?=(?:.*\d){4})(?=(?:.*[a-zA-Z]){3})(?=.*[A-Z]).{8,}$/;
    
    if (!passwordRegex.test(password)) {
      alert('La contraseña no cumple con los requisitos. Debe tener al menos 8 caracteres, una letra mayúscula y 4 números.');
      return false;
    }
  
    try {
      const data = [mail, username, password, isAdmin];
      await this.dbInstance.executeSql(
        `INSERT INTO users (mail, username, password, isAdmin) VALUES (?, ?, ?, ?)`,
        data
      );
      alert('Usuario registrado correctamente');
      return true;
    } catch (error) {
      alert('Error al registrar el usuario: ' + JSON.stringify(error));
      return false;
    }
  }
  


  // Iniciar sesión 
  public async login(username: string, password: string) {
    try {
      const result = await this.dbInstance.executeSql(
        `SELECT * FROM users WHERE username = ? AND password = ?`,
        [username, password]
      );
  
      if (result.rows.length > 0) {
        const user = result.rows.item(0);
  
        if (user.isBlocked === 1) {  // Verifica si el usuario está bloqueado
          alert('Tu cuenta está bloqueada. Contacta con el administrador.');
          return { success: false };
        }
  
        this.currentUsername = user.username;
        this.currentIsAdmin = user.isAdmin; // 1 es admin
        
        if (this.currentIsAdmin) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/home']);
        }
        
        return { success: true };
      } else {
        alert('Credenciales inválidas');
        return { success: false };
      }
    } catch (error) {
      alert('Error al iniciar sesión');
      return { success: false };
    }
  }

  public getUsername(): string | null {
    return this.currentUsername;
  }

  public async getUser(id: number) {
    const sql = 'SELECT * FROM users WHERE id = ?';
    const result = await this.dbInstance.executeSql(sql, [id]);
    return result.rows.item(0);
  }

  public async updateUserBlockStatus(id: number, isBlocked: number) {
    const sql = 'UPDATE users SET isBlocked = ? WHERE id = ?';
    return this.dbInstance.executeSql(sql, [isBlocked, id]);
  }
  
  public async updateUserAdminStatus(id: number, isAdmin: number) {
    const sql = 'UPDATE users SET isAdmin = ? WHERE id = ?';
    return this.dbInstance.executeSql(sql, [isAdmin, id]);
  }
  

  public async getAllUsers() {
    try {
      const result = await this.dbInstance.executeSql(`SELECT * FROM users`, []);
      const users = [];
      for (let i = 0; i < result.rows.length; i++) {
        users.push(result.rows.item(i));
      }
      return users;
    } catch (error) {
      alert('Error al obtener los usuarios');
      return [];
    }
  }

  public async updateUser(id: number, username: string, isAdmin: number, isBlocked: number) {
    const sql = 'UPDATE users SET username = ?, isAdmin = ?, isBlocked = ? WHERE id = ?';
    await this.dbInstance.executeSql(sql, [username, isAdmin ? 1 : 0, isBlocked ? 1 : 0, id]);
}

  public async deleteUser(id: number) {
    const sql = 'DELETE FROM users WHERE id = ?';
    await this.dbInstance.executeSql(sql, [id]);
  }

  public async getCurrentUser() {
    const sql = 'SELECT * FROM users WHERE username = ?';
    const result = await this.dbInstance.executeSql(sql, [this.currentUsername]);
    return result.rows.item(0);
  }

  public async updateUserProfile(username: string, password: string) {
    const sql = 'UPDATE users SET username = ?, password = ? WHERE username = ?';
    await this.dbInstance.executeSql(sql, [username, password, this.currentUsername]);
    this.currentUsername = username;
  }

  public async getUserStatus(userId: number) {
    const sql = 'SELECT * FROM users WHERE id = ?';
    const result = await this.dbInstance.executeSql(sql, [userId]);
    return result.rows.item(0);
  }

  public async findUserByEmail(mail: string): Promise<any> {
    try {
      const query = 'SELECT * FROM users WHERE mail = ?';
      const result = await this.dbInstance.executeSql(query, [mail]);
  
      if (result.rows.length > 0) {
        return result.rows.item(0);
      }
      return null;
    } catch (error) {
      alert('Error en findUserByEmail: ' + JSON.stringify(error));
      throw error; 
    }
  }

  private async getCurrentUserId(): Promise<number | null> {
    if (!this.currentUsername) {
      return null;
    }
    const result = await this.dbInstance.executeSql(
      'SELECT id FROM users WHERE username = ?',
      [this.currentUsername]
    );
    return result.rows.length > 0 ? result.rows.item(0).id : null;
  }

  async updateUsername(newUsername: string) {
    const userId = await this.getCurrentUserId(); // Método que obtiene el ID del usuario actual
    return this.dbInstance.executeSql(
      `UPDATE users SET username = ? WHERE id = ?`,
      [newUsername, userId]
    );
  }

  async validateCurrentPassword(currentPassword: string): Promise<boolean> {
    const currentUser = await this.getCurrentUser();
    return currentUser?.password === currentPassword; // Compara la contraseña actual con la almacenada
  }
  
  async updatePassword(newPassword: string) {
    const userId = await this.getCurrentUserId(); // Método que obtiene el ID del usuario actual
    return this.dbInstance.executeSql(
      `UPDATE users SET password = ? WHERE id = ?`,
      [newPassword, userId]
    );
  }
  
  


  // //////////////////////////////////////////////////////////////////////////
// CATEGORIAS ////////////////////////////////////////////////////////////////

  public async addCategoria(id: number, nombre: string, descripcion: string, imagen: string) {
    const sql = 'INSERT INTO categorias (id, nombre, descripcion, imagen) VALUES (?, ?, ?, ?)';
    try {
      await this.dbInstance.executeSql(sql, [id, nombre, descripcion, imagen]);
      alert('Categoría agregada correctamente');
      alert('Favor recargue la página');
      return { success: true };
    } catch (error) {
      alert('Error al agregar la categoría: ' + JSON.stringify(error));
      return { success: false };
    }
  }

  public async getCategorias() {
    const sql = 'SELECT * FROM categorias';
    try {
      const data = await this.dbInstance.executeSql(sql, []);
      const categorias = [];
      for (let i = 0; i < data.rows.length; i++) {
        categorias.push(data.rows.item(i));
      }
      return categorias;
    } catch (error) {
      alert('Error al obtener las categorías');
      return [];
    }
  }

  public async editarCategoria(id: number, nombre: string, descripcion: string, imagen: string) {
    const sql = 'UPDATE categorias SET nombre = ?, descripcion = ?, imagen = ? WHERE id = ?';
    try {
      await this.dbInstance.executeSql(sql, [nombre, descripcion, imagen, id]);
      alert('Categoría editada correctamente');
      return { success: true };
    } catch (error) {
      alert('Error al editar la categoría');
      return { success: false };
    }
  }


  public async deleteCategoria(id: number) {
    const sql = 'DELETE FROM categorias WHERE id = ?';
    try {
      await this.dbInstance.executeSql(sql, [id]);
      alert('Categoría eliminada correctamente');
      return { success: true };
    } catch (error) {
      alert('Error al eliminar la categoría');
      return { success: false };
    }
  }


  // //////////////////////////////////////////////////////////////////////////
// PRODUCTOS ////////////////////////////////////////////////////////////////

  public async addProducto(nombre: string, descripcion: string, precio: number, imagen: string, categoriaId: number) {
    const sql = 'INSERT INTO productos (nombre, descripcion, precio, imagen, categoriaId) VALUES (?, ?, ?, ?, ?)';
    try {
      await this.dbInstance.executeSql(sql, [nombre, descripcion, precio, imagen, categoriaId]);
      alert('Producto agregado correctamente');
      return { success: true };
    } catch (error) {
      alert('Error al agregar el producto: ' + JSON.stringify(error));
      return { success: false };
    }
  }

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

  async getProductosPorCategoria(categoriaId: number): Promise<any[]> {
    const productos = await this.getProductos();
    return productos.filter(producto => producto.categoriaId === categoriaId);
  }



  async editarProducto(id: number, nombre: string, descripcion: string, precio: number, imagen: string, categoriaId: number) {
    const sql = 'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, imagen = ?, categoriaId = ? WHERE id = ?';
    try {
      await this.dbInstance.executeSql(sql, [nombre, descripcion, precio, imagen, categoriaId, id]);
      alert('Producto editado correctamente');
      return { success: true };
    } catch (error) {
      alert('Error al editar el producto');
      return { success: false };
    }
  }

  public async deleteProducto(id: number) {
    const sql = 'DELETE FROM productos WHERE id = ?';
    await this.dbInstance.executeSql(sql, [id]);
  }

  // //////////////////////////////////////////////////////////////////////////
// CARRITO DE COMPRAS ////////////////////////////////////////////////////////

  public async addToCart(producto: any) {
    try {
      // Verificar si el producto ya está en el carrito
      const result = await this.dbInstance.executeSql(
        `SELECT * FROM cart WHERE productoId = ?`,
        [producto.id]
      );

      if (result.rows.length > 0) {
        // Si el producto ya está en el carrito, incrementar la cantidad
        const currentItem = result.rows.item(0);
        const nuevaCantidad = currentItem.cantidad + 1;
        await this.dbInstance.executeSql(
          `UPDATE cart SET cantidad = ? WHERE productoId = ?`,
          [nuevaCantidad, producto.id]
        );
      } else {
        // Si el producto no está en el carrito, agregarlo
        await this.dbInstance.executeSql(
          `INSERT INTO cart (productoId, nombre, descripcion, precio, cantidad, imagen) VALUES (?, ?, ?, ?, ?, ?)`,
          [producto.id, producto.nombre, producto.descripcion, producto.precio, 1, producto.imagen]
        );
      }

      alert('Producto agregado al carrito');
    } catch (error) {
      alert('Error al agregar producto al carrito: ' + JSON.stringify(error));
    }
  }

  public async getCartItems(): Promise<any[]> {
    try {
      const result = await this.dbInstance.executeSql('SELECT * FROM cart', []);
      const cartItems = [];
      for (let i = 0; i < result.rows.length; i++) {
        cartItems.push(result.rows.item(i));
      }
      return cartItems;
    } catch (error) {
      alert('Error al obtener los productos del carrito: ' + JSON.stringify(error));
      return [];
    }
  }

  public async removeFromCart(productoId: number) {
    try {
      await this.dbInstance.executeSql('DELETE FROM cart WHERE productoId = ?', [productoId]);
      alert('Producto eliminado del carrito');
    } catch (error) {
      alert('Error al eliminar el producto del carrito: ' + JSON.stringify(error));
    }
  }

  // //////////////////////////////////////////////////////////////////////////
// PEDIDOS //////////////////////////////////////////////////////////////////

  public async createOrder(total: number, cartItems: any[]) {
    try {
      const date = new Date().toISOString();

      // Insertar el pedido en la tabla 'orders'
      const orderResult = await this.dbInstance.executeSql(
        `INSERT INTO orders (total, fecha, username) VALUES (?, ?, ?)`,
        [total, date, this.currentUsername]
      );

      const orderId = orderResult.insertId;

      // Insertar cada producto del carrito en la tabla 'order_items'
      for (const item of cartItems) {
        await this.dbInstance.executeSql(
          `INSERT INTO order_items (orderId, productoId, nombre, cantidad, precio) VALUES (?, ?, ?, ?, ?)`,
          [orderId, item.productoId, item.nombre, item.cantidad, item.precio]
        );
      }

      alert('Pedido registrado correctamente');
      return true;
    } catch (error) {
      alert('Error al crear el pedido: ' + JSON.stringify(error));
      return false;
    }
  }

  public async getOrders() {
    try {
      const result = await this.dbInstance.executeSql('SELECT * FROM orders', []);
      const orders = [];
      for (let i = 0; i < result.rows.length; i++) {
        orders.push(result.rows.item(i));
      }
      return orders;
    } catch (error) {
      alert('Error al obtener los pedidos: ' + JSON.stringify(error));
      return [];
    }
  }

  public async deleteOrder(id: number) {
    const sql = 'DELETE FROM orders WHERE id = ?';
    await this.dbInstance.executeSql(sql, [id]);
  }


  public async getOrderDetails(orderId: number) {
    try {
      const result = await this.dbInstance.executeSql(
        `SELECT oi.productoId, oi.nombre, oi.cantidad, oi.precio 
         FROM order_items AS oi
         WHERE oi.orderId = ?`,
        [orderId]
      );
  
      const orderDetails = [];
      for (let i = 0; i < result.rows.length; i++) {
        orderDetails.push(result.rows.item(i));
      }
  
      return orderDetails;
    } catch (error) {
      alert('Error al obtener los detalles del pedido: ' + JSON.stringify(error));
      return [];
    }
  }

  public async getOrdersByUser() {
    try {
      const result = await this.dbInstance.executeSql(
        `SELECT * FROM orders WHERE username = ?`,
        [this.currentUsername]
      );
  
      const orders = [];
      for (let i = 0; i < result.rows.length; i++) {
        const order = result.rows.item(i);
  
        // Obtener productos asociados a este pedido
        const products = await this.getOrderDetails(order.id);
        orders.push({
          id: order.id,
          total: order.total,
          fecha: order.fecha,
          productos: products,
        });
      }
  
      return orders;
    } catch (error) {
      alert('Error al obtener los pedidos: ' + JSON.stringify(error));
      return [];
    }
  }
  
  
  

  // public async getOrderDetails(orderId: number) {
  //   const sql = 'SELECT * FROM order_items WHERE orderId = ?';
  //   const result = await this.dbInstance.executeSql(sql, [orderId]);
  //   const items = [];
  //   for (let i = 0; i < result.rows.length; i++) {
  //     items.push(result.rows.item(i));
  //   }
  //   const total = items.reduce((acc, item) => acc + item.precio, 0);
  //   return { productos: items, total: total };
  // }


  





}

