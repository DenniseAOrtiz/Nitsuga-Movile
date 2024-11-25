import { Component } from '@angular/core';
import { DbService } from './services/db.service';
import { MenuController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent{
  dropdownOpen = false;
  isLoading = false;
 


  constructor(private menu: MenuController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router,
    private nativeStorage: NativeStorage) {
    this.showSplash();
  }

  closeMenu() {
    this.menu.close();
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      duration: 500,
    });

    loading.present();
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    this.authService.logout(); // Ejecuta la lógica de cierre de sesión
    this.router.navigate(['/login']); // Redirige al usuario a la página de login
  }

  async showSplash() {
    await SplashScreen.show({
      autoHide: true,
      showDuration: 3000
    });
  }

  
  
  

}