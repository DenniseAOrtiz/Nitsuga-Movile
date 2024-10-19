import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EditProductModalComponent } from '../modals/edit-product-modal/edit-product-modal.component';
// import { EditarCategoryModalComponent } from '../modals/editar-category-modal/editar-category-modal.component';

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
          username TEXT UNIQUE,
          password TEXT,
          isAdmin INTEGER DEFAULT 1
        )`,
        []
      );
      // alert('Base de datos creada y tabla de usuarios lista');
    } catch (error) {
      alert('No se pudo crear la base de datos ' + error);
    }

    // tabla de categorias
    try {
      await this.dbInstance.executeSql(
        `CREATE TABLE IF NOT EXISTS categorias (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          descripcion TEXT,
          imagen TEXT
        )`, []
      );
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
          imagen TEXT,
          categoriaId INTEGER,
          FOREIGN KEY (categoriaId) REFERENCES categorias(id)
      )`, []
      );
      //alert('Base de datos creada y tabla de productos lista');
    } catch (error) {
      alert('No se pudo crear la tabla de productos: ' + JSON.stringify(error));
    }

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
      const data = [username, password, 1];
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



  // Iniciar sesión 
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

  // Gestionar categorías
  public async addCategoria(nombre: string, descripcion: string, imagen: string) {
    const sql = 'INSERT INTO categorias (nombre, descripcion, imagen) VALUES (?, ?, ?)';
    try {
      await this.dbInstance.executeSql(sql, [nombre, descripcion, imagen]);
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


    // Gestionar productos
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

  async editarProducto( id: number, nombre: string, descripcion: string, precio: number, imagen: string, categoriaId: number) {
    const modal = await this.modalController.create({
      component: EditProductModalComponent,
      componentProps: { id, nombre, descripcion, precio, imagen, categoriaId }
    });

    modal.onDidDismiss().then(async (result) => {
      if (result.data && result.data.updated) {
        await this.getProductos();
      }
    });

    return await modal.present();
  }

  public async deleteProducto(id: number) {
    const sql = 'DELETE FROM productos WHERE id = ?';
    await this.dbInstance.executeSql(sql, [id]);
  }



}

