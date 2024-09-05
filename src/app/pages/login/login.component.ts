import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onLogin() {
    if (this.username === 'admin' && this.password === '1234asD') {
      this.router.navigate(['/folder/home']);
    } else {
      alert('Contraseña o usuario incorrecto');
    }
  }

  onResetPassword() {
    this.router.navigate(['/reset-password']);
  }  

  goToRegister() {
    console.log('Navigating to register');
    this.router.navigate(['/register']);
  }  
}