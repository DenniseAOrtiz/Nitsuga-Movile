import { Component, Inject } from '@angular/core';
import { DbService } from '../../services/db.service'; 
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  mail: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  isAdmin: number = 0;
  errorMessage: string = '';

  constructor(@Inject(DbService) private dbService: DbService, private router: Router, private loadingCtrl: LoadingController) {}

  

  async register() {
    try {
      if (!this.mail || !this.username || !this.password.trim() || !this.confirmPassword.trim()) {
        this.errorMessage = 'Todos los campos son obligatorios';
        return;
      }
    
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Las contraseñas no coinciden';
        return;
      }
    
      const isRegistered = await this.dbService.register(this.mail, this.username, this.password, this.isAdmin);
      if (isRegistered) {
        this.router.navigate(['/login']);
      } else {
        alert('Error al registrar el usuario');
      }
    } catch (error) {
      alert('Error al registrar el usuario: ' + JSON.stringify(error));
    }
  }
  

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      duration: 500,
    });

    loading.present();
  }
}