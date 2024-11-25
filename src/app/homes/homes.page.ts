import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { DbService } from '../services/db.service';
import { APIService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.page.html',
  styleUrls: ['./homes.page.scss'],
})

export class HomesPage implements OnInit {
  indicators: any;
  nombreUsuario: string | null = null;
  productos: any[] = [];
  @ViewChild(IonCard, { read: ElementRef }) card: ElementRef<HTMLIonCardElement> | undefined;

  private animation: Animation | undefined;

  constructor(private animationCtrl: AnimationController,
    private loadingCtrl: LoadingController,
    private dbService: DbService,
    private APIService: APIService,
    private authService: AuthService,
    private router: Router) {
    this.nombreUsuario = this.dbService.getUsername(); // Recuperamos el nombre de usuario
  }
  ngOnInit() {
    this.nombreUsuario = this.dbService.getUsername();

    this.APIService.getIndicators().subscribe(data => {
      this.indicators = data;
      console.log(this.indicators);
    });

    this.loadProductos();
  }

  async loadProductos() {
    this.productos = await this.dbService.getProductos();
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      duration: 500,
    });

    loading.present();
  }

  showCart() {
    this.router.navigate(['/carrito']);
  }

  logout() {
    this.authService.logout(); 
    this.router.navigate(['/login']); 
  }

  agregarAlCarrito(producto: any) {
    this.dbService.addToCart(producto);
    console.log(`Producto ${producto.nombre} agregado al carrito`);
  }
}

//   ionViewDidEnter() {
//     this.network.onDisconnect().subscribe(() => {
//       console.log('Estamos desconectados');
//     });
  
//     this.network.onConnect().subscribe(() => {
//       console.log('Estamos conectados');
//       setTimeout(() => {
//         if (this.network.type == 'wifi') console.log('Estamos conectados a wifi');
//       }, 3000);
//     });
//   }

  





