import { Injectable } from '@angular/core';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private isAdmin: boolean = false;

  constructor(private router: Router) {}

  setAuth(isAuthenticated: boolean, isAdmin: boolean) {
    this.isAuthenticated = isAuthenticated;
    this.isAdmin = isAdmin;
  }

  getAuthStatus() {
    return { isAuthenticated: this.isAuthenticated, isAdmin: this.isAdmin };
  }

  logout() {
    this.isAuthenticated = false;
    this.isAdmin = false;

    // Si tienes un almacenamiento local o cookies, puedes limpiar los datos aquí
    // Ejemplo con localStorage (si guardas alguna sesión)
    // localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }
}
