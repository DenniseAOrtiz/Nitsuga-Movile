import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const { isAuthenticated, isAdmin } = this.authService.getAuthStatus();
    if (isAuthenticated && isAdmin) {
      this.router.navigate(['/admin']); //redirige a la pagina de admin
      return true;
    } else {
      this.router.navigate(['/home']); // Redirige a home si no es admin
      return false;
    }
  }
}
