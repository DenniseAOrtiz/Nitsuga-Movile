import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../services/db.service';
import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isAdmin: boolean = false;

  constructor(private router: Router, private dbService: DbService, private authService: AuthService, private loadingCtrl: LoadingController) {}

  async login() {
    const result = await this.dbService.login(this.username, this.password);
    
    if (!result.success) {
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
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      duration: 500,
    });

    loading.present();
  }
}
