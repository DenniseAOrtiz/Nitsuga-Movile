import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();
  public username: string = '';
  public password: string = '';

  constructor(private router: Router) { 
  }

  login() {
    if (this.username === 'admin' && this.password === '1234asD') {
      this.router.navigate(['/home']);
    } else {
      alert('Contraseña o usuario incorrecto');
    }
    this.isLoggedIn.next(true); 
  }

  logout() {
    // 
    this.isLoggedIn.next(false);
  }

}