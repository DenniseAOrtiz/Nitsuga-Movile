import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    $('#registerForm').submit((event) => {
      event.preventDefault();
      this.validateForm();
    });
  }

  validateForm() {
    let isValid = true;

    // Validar usuario
    const username = $('#username').val() as string;
    if (username.length < 3) {
      $('#usernameError').text('El usuario debe tener al menos 3 caracteres.');
      isValid = false;
    } else {
      $('#usernameError').text('');
    }

    // Validar correo
    const email = $('#email').val() as string;
    if (!this.isValidEmail(email)) {
      $('#emailError').text('El correo electrónico no es válido.');
      isValid = false;
    } else {
      $('#emailError').text('');
    }

    // Validar contraseña
    const password = $('#password').val() as string;
  if (!this.isValidPassword(password)) {
    $('#passwordError').text('La contraseña debe tener 4 números, 3 caracteres y 1 mayúscula.');
    isValid = false;
  } else {
    $('#passwordError').text('');
  }

    // Validar confirmar contraseña
    const confirmPassword = $('#confirmPassword').val() as string;
    if (password !== confirmPassword) {
      $('#confirmPasswordError').text('Las contraseñas no coinciden.');
      isValid = false;
    } else {
      $('#confirmPasswordError').text('');
    }

    if (isValid) {
      console.log('Formulario válido');
      this.router.navigate(['/login']);
    }
  }

  isValidEmail(email: string): boolean {
    //expresion regular de validacion de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  isValidPassword(password: string): boolean {
    //expresion regular de validacion de contrasena
    const passwordRegex = /^(?=.*\d{4})(?=.*[a-zA-Z]{3})(?=.*[A-Z]).{7,}$/; 
    return passwordRegex.test(password);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}

