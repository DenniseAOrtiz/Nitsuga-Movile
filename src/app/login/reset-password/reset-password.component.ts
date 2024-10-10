import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  email: string = '';

  constructor(private router: Router) {}

  onResetPassword() {
    if (this.email) {
      alert(`Revisa tu bandeja en ${this.email} para recuperar tu contraseña.`);
      this.router.navigate(['/login']);
    } else {
      alert('Correo electrónico inexistente.');
    }
  }
}
