import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public username: string = '';
  public password: string = '';

  constructor(private router: Router, private authService: AuthService) { }

  public onLogin() {
    if (this.username === 'admin' && this.password === '1234asD') {
      this.router.navigate(['/home']);
      this.authService.login();
    } else {
      alert('Contraseña o usuario incorrecto');
    }
    
  }
  public onResetPassword() {
    this.router.navigate(['/reset-password']);
  }  

  public goToRegister() {
    console.log('Navigating to register');
    this.router.navigate(['/register']);
  }  

  ngOnInit() {
  }

}
