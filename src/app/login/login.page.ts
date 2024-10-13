import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  errorMessage: string = ''; // Definimos la propiedad errorMessage

  constructor(private router: Router, private DbService: DbService) {}

  async register() {
    const success = await this.DbService.register(this.username, this.password);
    if (success) {
      console.log('User registered');
    } else {
      console.log('Registration failed');
    }
  }

  async login() {
    const success = await this.DbService.login(this.username, this.password);
    
    if (success) {
      console.log('Login successful');
      this.router.navigate(['/home']);  // Navegar a la página principal si el login es exitoso
    } else {
      this.errorMessage = 'Invalid username or password';  // Mostrar mensaje de error
    }
  }

  public onResetPassword() {
    this.router.navigate(['/reset-password']);
  } 
  public goToRegister() {
    console.log('Navigating to register');
    this.router.navigate(['/register']);
  } 
}
