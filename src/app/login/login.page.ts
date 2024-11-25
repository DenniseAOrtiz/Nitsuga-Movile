import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../services/db.service';
import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { PluginListenerHandle } from '@capacitor/core';
import { ConnectionStatus, Network } from '@capacitor/network';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy{
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isAdmin: number = 0;
  isLoading = false;
  networkListener: PluginListenerHandle | undefined;
  status: boolean | undefined;


  constructor(
    private router: Router, 
    private dbService: DbService, 
    private authService: AuthService, 
    private loadingCtrl: LoadingController,
    private ngZone: NgZone
  ) { }

  async ngOnInit() {
    this.networkListener = await Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status);
      this.ngZone.run(() => {
        this.changeStatus(status);
      })
    });
    const status = await Network.getStatus();
    this.changeStatus(status);
    console.log('Estado de conexión: ', this.status);
  }

  changeStatus(status: ConnectionStatus) {
    this.status = status?.connected;
  }

  ngOnDestroy(): void {
    if (this.networkListener) this.networkListener.remove();
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      duration: 500,
    });

    loading.present();
  }

  ionViewWillEnter() {
    this.clearInputs(); 
  }

  clearInputs() {
    this.username = '';
    this.password = '';
  }


  async login() {
    // Validación de campo username vacío
    if (!this.username || this.username.trim() === '') {
      this.errorMessage = 'El nombre de usuario es obligatorio';
      this.isLoading = false;
      return;
    }
  
    // Mostrar loading y continuar con el proceso de login
    this.showLoading();
    const result = await this.dbService.login(this.username, this.password);
  
    if (!result.success) {
      this.errorMessage = 'Credenciales inválidas';
    }
    this.isLoading = false;
  }
  


  public onResetPassword() {
    this.router.navigate(['/reset-password']);
  }

  public goToRegister() {
    console.log('Navegando a registro');
    this.router.navigate(['/register']);
  }


  

}



// import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { DbService } from '../services/db.service';
// import { AuthService } from '../services/auth.service';
// import { LoadingController } from '@ionic/angular';
// import { PluginListenerHandle } from '@capacitor/core';
// import { ConnectionStatus, Network } from '@capacitor/network';


// @Component({
//   selector: 'app-login',
//   templateUrl: './login.page.html',
//   styleUrls: ['./login.page.scss'],
// })
// export class LoginPage  implements OnInit, OnDestroy{

//   username: string = '';
//   password: string = '';
//   errorMessage: string = '';
//   isAdmin: number = 0;
//   isLoading = false;
//   networkListener: PluginListenerHandle | undefined;
//   status: boolean | undefined;

//   constructor(
//     private router: Router,
//     private dbService: DbService,
//     private authService: AuthService,
//     private loadingCtrl: LoadingController,
//     private ngZone: NgZone
//   ) { }

//   async ngOnInit() {
//     this.networkListener = await Network.addListener('networkStatusChange', status => {
//       console.log('Network status changed', status);
//       this.ngZone.run(() => {
//         this.changeStatus(status);
//       })
//     });
//     const status = await Network.getStatus();
//     this.changeStatus(status);
//     console.log('Estado de conexión: ', this.status);
//   }

//   changeStatus(status: ConnectionStatus) {
//     this.status = status?.connected;
//   }

//   ngOnDestroy(): void {
//     if (this.networkListener) this.networkListener.remove();
//   }

//   async showLoading() {
//     const loading = await this.loadingCtrl.create({
//       duration: 500,
//     });

//     loading.present();
//   }

//   ionViewWillEnter() {
//     this.clearInputs();
//   }

//   clearInputs() {
//     this.username = '';
//     this.password = '';
//   }


//   async login() {
//     this.showLoading();
//     const result = await this.dbService.login(this.username, this.password);
  
//     if (!result.success) {
//       this.errorMessage = 'Credenciales inválidas';
//     } else {
//       alert('Redirección completada correctamente.');
//     }
//     this.isLoading = false;
//   }
  


//   public onResetPassword() {
//     this.router.navigate(['/reset-password']);
//   }

//   public goToRegister() {
//     console.log('Navegando a registro');
//     this.router.navigate(['/register']);
//   }

  



// }



