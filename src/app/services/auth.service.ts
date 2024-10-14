import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private isAdmin: boolean = false;

  constructor() {}

  setAuth(isAuthenticated: boolean, isAdmin: boolean) {
    this.isAuthenticated = isAuthenticated;
    this.isAdmin = isAdmin;
  }

  getAuthStatus() {
    return { isAuthenticated: this.isAuthenticated, isAdmin: this.isAdmin };
  }
}
