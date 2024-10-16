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
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  isAdmin: boolean = false;
  errorMessage: string = '';

  constructor(@Inject(DbService) private dbService: DbService, private router: Router, private loadingCtrl: LoadingController) {}

  async register() {
    // Valida que las contraseñas coincidan
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    // Llama al servicio de autenticación para registrar al usuario
    const success = await this.dbService.register(this.username, this.password, this.isAdmin);
    
    console.log(success);

    if (success) {
      console.log('Usuario registrado correctamente');
      this.router.navigate(['/login']); 
    } else {
      this.errorMessage = 'Registro fallido.';
    }
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      duration: 500,
    });

    loading.present();
  }
}