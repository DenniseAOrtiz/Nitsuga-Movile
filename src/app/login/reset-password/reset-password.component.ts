import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  email: string = '';

  constructor(private router: Router, @Inject(DbService) private dbService: DbService) {}

  onResetPassword() {
    if (this.email) {
      alert(`Revisa tu bandeja en ${this.email} para recuperar tu contraseña.`);
      this.router.navigate(['/login']);
    } else {
      alert('Correo electrónico inexistente.');
    }
  }
}