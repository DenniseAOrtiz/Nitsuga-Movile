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
  errorMessage: string = ''; 

  constructor(private router: Router, private DbService: DbService) {}

  async register() {
    const success = await this.DbService.register(this.username, this.password);
    if (success) {
      console.log('Usuario registrado');
    } else {
      console.log('Registro fallido');
    }
  }

  async login() {
    const success = await this.DbService.login(this.username, this.password);
    
    if (success) {
      console.log('Inicio de sesión exitoso');
      this.router.navigate(['/home']); 
    } else {
      this.errorMessage = 'Invalid username or password'; 
    }
  }

  public onResetPassword() {
    this.router.navigate(['/reset-password']);
  } 
  public goToRegister() {
    console.log('Navegando a registro');
    this.router.navigate(['/register']);
  } 
}
