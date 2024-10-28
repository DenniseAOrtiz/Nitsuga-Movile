// src/app/guards/admin.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { DbService } from '../services/db.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private dbService: DbService, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

    const user = await this.dbService.getCurrentUser(); 
    if (user && user.isAdmin) {
      return true; 
    } else {
      this.router.navigate(['/login']); // Redirigir a la página de inicio si no es admin
      return false; 
    }
  }
}
