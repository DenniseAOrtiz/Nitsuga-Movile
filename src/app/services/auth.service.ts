import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private dbInstance: SQLiteObject;

  constructor(private sqlite: SQLite, private platform: Platform) {
    this.platform.ready().then(() => {
      this.createDB();
    });
  }

  // Crear base de datos y tabla de usuarios
  private async createDB() {
    try {
      this.dbInstance = await this.sqlite.create({
        name: 'users.db',
        location: 'default'
      });

      await this.dbInstance.executeSql(
        `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE,
          password TEXT
        )`,
        []
      );
      console.log('Database created and users table is ready');
    } catch (error) {
      console.error('Unable to create database', error);
    }
  }

  // Registro de un nuevo usuario
  public async register(username: string, password: string): Promise<boolean> {
    try {
      const data = [username, password];
      await this.dbInstance.executeSql(
        `INSERT INTO users (username, password) VALUES (?, ?)`,
        data
      );
      console.log('User registered successfully');
      return true;
    } catch (error) {
      console.error('Error registering user', error);
      return false;
    }
  }

  // Iniciar sesión de usuario
  public async login(username: string, password: string): Promise<boolean> {
    try {
      const result = await this.dbInstance.executeSql(
        `SELECT * FROM users WHERE username = ? AND password = ?`,
        [username, password]
      );

      if (result.rows.length > 0) {
        console.log('Login successful');
        return true;
      } else {
        console.log('Invalid credentials');
        return false;
      }
    } catch (error) {
      console.error('Error logging in', error);
      return false;
    }
  }

  // Obtener todos los usuarios registrados (opcional)
  public async getAllUsers() {
    try {
      const result = await this.dbInstance.executeSql(`SELECT * FROM users`, []);
      const users = [];
      for (let i = 0; i < result.rows.length; i++) {
        users.push(result.rows.item(i));
      }
      return users;
    } catch (error) {
      console.error('Error fetching users', error);
      return [];
    }
  }
}










// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { Router } from '@angular/router';
// //import { Capacitor } from '@capacitor/core';
// //import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
// //import * as sqlite3 from 'sqlite3';
// //import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
// //import { open } from 'sqlite';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private isLoggedIn = new BehaviorSubject<boolean>(false);
//   isLoggedIn$ = this.isLoggedIn.asObservable();
//   public username: string = '';
//   public password: string = '';

//   private sqlite: typeof CapacitorSQLite;
//   private db: SQLiteConnection;

//   constructor(private router: Router) { 
//     this.sqlite = CapacitorSQLite;

//     if (Capacitor.isNativePlatform()) {
//       this.initializePlugin();
//     } else {
      
//     }
//   }

//   private async initializePlugin() {
//     try {
//       this.db = await this.sqlite.createConnection({
//         database: 'mydb',
//         encrypted: false,
//         mode: 'no-encryption',
//         version: 1
//       }) as unknown as SQLiteConnection;
  
//       if (this.db) {
//         this.db = new sqlite3.Database('path/to/database.sqlite', (err) => {
//           if (err) {
//             console.error('Error al abrir la BBDD', err.message);
//           } else {
//             console.log('Conexion de BBDD exitosa', this.db);
//             this.createTables();
//           }
//         }) as unknown as SQLiteConnection;
//       } else {
//         console.error('Failed to create database connection');
//       }
//     } catch (error) {
//       console.error('Error initializing SQLite plugin:', error);
//     }
//   }

//   private async createTables() {

//     this.db = window.sqlitePlugin.openDatabase({name: 'my.db', location: 'default'});

//     const db = await this.dbInstance.open(); // Ensure you have a method to open the connection
//     db.run(`
//       CREATE TABLE IF NOT EXISTS users (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         username TEXT UNIQUE NOT NULL,
//         email TEXT UNIQUE NOT NULL,
//        password TEXT NOT NULL
//       )
//     `);
//   }

//   async register(username: string, email: string, password: string): Promise<boolean> {
//     try {
//       await this.db.open(); // Abre la conexión (si no está abierta)

//       const res = await this.db.run(`
//         INSERT INTO users (username, email, password) VALUES (?, ?, ?)
//       `, [username, email, password]);

//       return res.changes > 0; 
//     } catch (err) {
//       console.error(err);
//       return false;
//     }
//   }
  
//   async login(username: string, password: string): Promise<boolean> {
//     try {
//       await this.db.open(); 
  
//       const res = await this.db.query(`
//         SELECT * FROM users WHERE username = ? AND password = ?
//       `, [username, password]);
  
//       return res.values.length > 0; 
//     } catch (err) {
//       console.error(err);
//       return false;
//     }
//   }

//   // login() {
//   //  if (this.username === 'admin' && this.password === '1234asD') {
//   //    this.router.navigate(['/home']);
//   //  } else {
//   //    alert('Contraseña o usuario incorrecto');
//   //  }
//   //  this.isLoggedIn.next(true); 
//   //}

//   logout() {
//     // 
//     this.isLoggedIn.next(false);
//   }

// }

// // Extender la interfaz Window
// declare global {
//   interface Window {
//     sqlitePlugin: any;
//   }
// }
