import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string;
  password: string;
  errorMessage: string; // Definimos la propiedad errorMessage

  constructor(private router: Router, private authService: AuthService) {}

  async register() {
    const success = await this.authService.register(this.username, this.password);
    if (success) {
      console.log('User registered');
    } else {
      console.log('Registration failed');
    }
  }

  async login() {
    const success = await this.authService.login(this.username, this.password);
    
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



// import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../services/auth.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.page.html',
//   styleUrls: ['./login.page.scss'],
// })
// export class LoginPage implements OnInit {
//   public username: string = '';
//   public password: string = '';

//   constructor(private router: Router, private authService: AuthService) { }

//   public onLogin() {
//     if (this.username === 'admin' && this.password === '1234asD') {
//       this.router.navigate(['/home']);
//       this.authService.login();
//     } else {
//       alert('Contraseña o usuario incorrecto');
//     }
    
//   }
//   public onResetPassword() {
//     this.router.navigate(['/reset-password']);
//   }  

//   public goToRegister() {
//     console.log('Navigating to register');
//     this.router.navigate(['/register']);
//   }  

//   ngOnInit() {
//   }

// }
