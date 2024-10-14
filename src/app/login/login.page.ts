import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../services/db.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private dbService: DbService, private authService: AuthService) {}

  async login() {
    const result = await this.dbService.login(this.username, this.password);
    
    if (result.success) {
      this.authService.setAuth(true, result.isAdmin);
      this.router.navigate(['/home']); 
    } else {
      this.errorMessage = 'Credenciales inválidas';
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
