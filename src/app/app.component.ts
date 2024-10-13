import { Component } from '@angular/core';
import { DbService } from './services/db.service';
import { LoadingController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  isLoggedIn: boolean = false;

  public appPages = [
    { title: 'Inicio', url: 'home', icon: 'home' },
    { title: 'Categorias', url: '/folder/categorias', icon: 'grid' },
    { title: 'Lista de deseos', url: '/folder/favoritos', icon: 'heart-circle' },
    { title: 'Mis compras', url: '/folder/compras', icon: 'bag-handle' },
    { title: 'Mis direcciones', url: '/folder/direcciones', icon: 'paper-plane' },
    { title: 'Mi perfil', url: 'login', icon: 'paw' },
  ];

  public labels = ['Familia', 'Notas', 'Amigos'];
  constructor(private authService: AuthService, private loadingCtrl: LoadingController, private menu: MenuController) {
    this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
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
}