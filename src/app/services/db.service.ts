import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DbService { 
  private dbInstance!: SQLiteObject;
  private currentUsername: string | null = null;
  private currentIsAdmin: boolean = false;

  constructor(private sqlite: SQLite, private platform: Platform, private router: Router) {
    this.platform.ready().then(() => {
      this.createDB();
    });
  }

  // Creación de la base de datos y tabla de usuarios
  private async createDB() {
    try {
      const db = await this.sqlite.create({
        name: 'users.db',
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
      alert('Base de datos creada y tabla de usuarios lista');
    } catch (error) {
      console.error('No se pudo crear la base de datos', error);
    }
  }

  // Registro de un nuevo usuario
  public async register(username: string, password: string, isAdmin: boolean = false): Promise<boolean> {
    const passwordRegex = /^(?=(?:.*\d){4})(?=(?:.*[a-zA-Z]){3})(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert('La contraseña no cumple con los requisitos. La contraseña debe tener al menos 8 caracteres, una letra mayúscula y 4 números.');
      return false;
    } else {
    }

    try {
      const data = [username, password, isAdmin ? 1 : 0];
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
  public async login(username: string, password: string): Promise<{ success: boolean; isAdmin: boolean }> {
    try {
      const result = await this.dbInstance.executeSql(
        `SELECT * FROM users WHERE username = ? AND password = ?`,
        [username, password]
      );

      if (result.rows.length > 0) {
        const user = result.rows.item(0);
        this.currentUsername = username;
        this.currentIsAdmin = user.isAdmin === 1; // 1 es admin
        alert('Inicio de sesión exitoso');
        this.router.navigate(['/admin']);
        return { success: true, isAdmin: this.currentIsAdmin };
      } else {
        alert('Credenciales inválidas');
        return { success: false, isAdmin: false };
      }
    } catch (error) {
      alert('Error al iniciar sesión');
      return { success: false, isAdmin: false };
    }
  }

  public getUsername(): string | null {
    return this.currentUsername;
  }

  public isUserAdmin(): boolean {
    return this.currentIsAdmin; // Método para verificar si el usuario es admin
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
}
