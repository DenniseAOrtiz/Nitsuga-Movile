import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: 'home', icon: 'home' },
    { title: 'Categorias', url: '/folder/categorias', icon: 'grid' },
    { title: 'Lista de deseos', url: '/folder/favoritos', icon: 'heart-circle' },
    { title: 'Mis compras', url: '/folder/compras', icon: 'bag-handle' },
    { title: 'Mis direcciones', url: '/folder/direcciones', icon: 'paper-plane' },
    { title: 'Mi perfil', url: 'login', icon: 'paw' },
  ];

  public labels = ['Familia', 'Notas', 'Amigos'];
  constructor() {}
}

