import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private dbInstance!: SQLiteObject;

  constructor(private sqlite: SQLite, private platform: Platform) {
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
          email TEXT UNIQUE,
          password TEXT
        )`,
        []
      );
      alert('Base de datos creada y tabla de usuarios lista');
    } catch (error) {
      console.error('No se pudo crear la base de datos', error);
    }
  }

  // Registro de un nuevo usuario
  public async register(username: string, password: string, email: string): Promise<boolean> {
    const passwordRegex = /^(?=(?:.*\d){4})(?=(?:.*[a-zA-Z]){3})(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert('La contraseña no cumple con los requisitos. La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.');
      return false;
    } else {
    }

    try {
      const data = [username, password, email];
      await this.dbInstance.executeSql(
        `INSERT INTO users (username, password, email) VALUES (?, ?, ?)`,
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
  public async login(username: string, password: string, email: string): Promise<boolean> {
    try {
      const result = await this.dbInstance.executeSql(
        `SELECT * FROM users WHERE username = ? AND password = ?`,
        [username, password, email]
      );

      if (result.rows.length > 0) {
        alert('Inicio de sesión exitoso');
        return true;
      } else {
        alert('Credenciales inválidas');
        return false;
      }
    } catch (error) {
      alert('Error al iniciar sesión');
      return false;
    }
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
