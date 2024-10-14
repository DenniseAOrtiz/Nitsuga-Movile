import { Component, Inject } from '@angular/core';
import { DbService } from '../../services/db.service'; // Asegúrate de que la ruta es correcta
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(@Inject(DbService) private dbService: DbService, private router: Router) {}

  async register() {
    // Valida que las contraseñas coincidan
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    // Llama al servicio de autenticación para registrar al usuario
    const success = await this.dbService.register(this.username, this.password);
    
    console.log(success);

    if (success) {
      console.log('Usuario registrado correctamente');
      this.router.navigate(['/login']); 
    } else {
      this.errorMessage = 'Registro fallido.';
    }
  }
}