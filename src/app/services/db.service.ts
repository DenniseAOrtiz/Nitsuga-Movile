import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EditProductModalComponent } from '../modals/edit-product-modal/edit-product-modal.component';
//import { EditarCategoryModalComponent } from '../modals/editar-category-modal/editar-category-modal.component';

@Injectable({
  providedIn: 'root'
})
export class DbService { 
  private dbInstance!: SQLiteObject;
  private currentUsername: string | null = null;
  private currentIsAdmin: boolean = false;

  constructor(private sqlite: SQLite, private platform: Platform, private router: Router, private modalController: ModalController) {
    this.platform.ready().then(() => {
      this.createDB();
    });
  }

  // Creación de la base de datos y tabla de usuarios
  private async createDB() {
    try {
      const db = await this.sqlite.create({
        name: 'ecommerce.db',
        location: 'default'
      });
      this.dbInstance = db;


      await this.dbInstance.executeSql(
        `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE,
          password TEXT,
          isAdmin INTEGER DEFAULT 0
        )`,
        []
      );
      // alert('Base de datos creada y tabla de usuarios lista');
    } catch (error) {
      alert('No se pudo crear la base de datos ' + error);
    }

    await this.dbInstance.executeSql(
      `CREATE TABLE IF NOT EXISTS categorias (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        imagen TEXT,
        descripcion TEXT
      )`, []
    );

    // Crear tabla de productos
    await this.dbInstance.executeSql(
      `CREATE TABLE IF NOT EXISTS productos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        descripcion TEXT,
        precio REAL NOT NULL,
        imagen TEXT,
        categoriaId INTEGER,
        FOREIGN KEY (categoriaId) REFERENCES categorias (id) ON DELETE CASCADE
      )`, []
    );

  }

  // Registro de un nuevo usuario
  public async register(username: string, password: string, isAdmin: boolean) {
    const passwordRegex = /^(?=(?:.*\d){4})(?=(?:.*[a-zA-Z]){3})(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert('La contraseña no cumple con los requisitos. La contraseña debe tener al menos 8 caracteres, una letra mayúscula y 4 números.');
      return false;
    } else {
    }

    try {
      const data = [username, password, 0];
      await this.dbInstance.executeSql(
        `INSERT INTO users (username, password, isAdmin) VALUES (?, ?, ?)`,
        data
      );
      alert('Usuario registrado correctamente');
      return true;
    } catch (error) {
      alert('Error al registrar el usuario');
      return false;
    }
  }

  

  // Iniciar sesión de usuario
  public async login(username: string, password: string) {
    try {
      const result = await this.dbInstance.executeSql(
        `SELECT * FROM users WHERE username = ? AND password = ?`,
        [username, password]
      );

      if (result.rows.length > 0) {
        const user = result.rows.item(0);
        // alert(JSON.stringify(user));
        // alert(user.isAdmin);
        this.currentUsername = user.username;
        this.currentIsAdmin = user.isAdmin === 1 ? true : false; // 1 es admin
        // alert('Inicio de sesión exitoso');
        // alert(this.currentIsAdmin);
        if (this.currentIsAdmin) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/home']);
        }
        return {success: true};
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

  // public isUserAdmin(): boolean {
  //   return this.currentIsAdmin; // Método para verificar si el usuario es admin
  // }

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

  // Métodos para gestionar categorías
  public async addCategoria(nombre: string, descripcion: string, imagen: string) {
    const sql = 'INSERT INTO categorias (nombre, descripcion, imagen) VALUES (?, ?, ?)';
    await this.dbInstance.executeSql(sql, [nombre, descripcion, imagen]);
  }

  public async getCategorias() {
    const sql = 'SELECT * FROM categorias';
    const data = await this.dbInstance.executeSql(sql, []);
    const categorias = [];
    for (let i = 0; i < data.rows.length; i++) {
      categorias.push(data.rows.item(i));
    }
    return categorias;
  }

  public async editarCategoria(id: number, nombre: string, descripcion: string) {
    const sql = 'UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?';
    await this.dbInstance.executeSql(sql, [nombre, descripcion, id]);
  }
  

  public async deleteCategoria(id: number) {
    const sql = 'DELETE FROM categorias WHERE id = ?';
    await this.dbInstance.executeSql(sql, [id]);
  }

 
    // Métodos para gestionar productos
  async editarProducto( id: number, nombre: string, descripcion: string, precio: number, imagen: string) {
    const modal = await this.modalController.create({
      component: EditProductModalComponent,
      componentProps: { id, nombre, descripcion, precio, imagen } 
    });
  
    modal.onDidDismiss().then(async (result) => {
      if (result.data && result.data.updated) {
        await this.getProductos(); 
      }
    });
  
    return await modal.present();
  }


  public async addProducto(nombre: string, descripcion: string, precio: number, imagen: string, categoriaId: number) {
    const sql = 'INSERT INTO productos (nombre, descripcion, precio, imagen, categoriaId) VALUES (?, ?, ?, ?, ?)';
    await this.dbInstance.executeSql(sql, [nombre, descripcion, precio, imagen, categoriaId]);
  }

  public async getProductos() {
    const sql = 'SELECT * FROM productos';
    const data = await this.dbInstance.executeSql(sql, []);
    const productos = [];
    for (let i = 0; i < data.rows.length; i++) {
      productos.push(data.rows.item(i));
    }
    return productos;
  }

  public async deleteProducto(id: number) {
    const sql = 'DELETE FROM productos WHERE id = ?';
    await this.dbInstance.executeSql(sql, [id]);
  }

  
}

