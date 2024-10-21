import { Injectable } from '@angular/core';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private isAdmin: number = 0;

  constructor(private router: Router) {}

  setAuth(isAuthenticated: boolean, isAdmin: number) {
    this.isAuthenticated = isAuthenticated;
    this.isAdmin = isAdmin;
  }

  getAuthStatus() {
    return { isAuthenticated: this.isAuthenticated, isAdmin: this.isAdmin };
  }

  logout() {
    this.isAuthenticated = false;
    this.isAdmin = 1;

    // Si tienes un almacenamiento local o cookies, puedes limpiar los datos aquí
    // Ejemplo con localStorage (si guardas alguna sesión)
    // localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }
}
