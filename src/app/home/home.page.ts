import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { DbService } from '../services/db.service';
import { APIService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Network } from '@awesome-cordova-plugins/network/ngx';
// import { Producto } from '../models/producto.model'; // Asegúrate de tener un modelo para los productos

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  indicators: any;
  nombreUsuario: string | null = null;
  productos: any[] = [];

  @ViewChild(IonCard, { read: ElementRef }) card: ElementRef<HTMLIonCardElement> | undefined;

  private animation: Animation | undefined;

  constructor(
    private animationCtrl: AnimationController,
    private loadingCtrl: LoadingController,
    private dbService: DbService,
    private APIService: APIService,
    private authService: AuthService,
    private router: Router,
    public network: Network
  ) {
    this.nombreUsuario = this.dbService.getUsername();
  }

  ionViewDidLoad() {
    let desconectar = this.network.onDisconnect().subscribe(() => {
      console.log('Estamos desconectados')
    });

    let conectar = this.network.onConnect().subscribe(() => {
      console.log('Estamos conectados');


      setTimeout(() => {
        if (this.network.type == 'wifi') {
          console.log('estamos conectados a wifi');
        }
        if (this.network.type == 'ethernet') {
          console.log('Estamos conectados a ethernet')
        }
        if (this.network.type == '4g') {
          console.log('Estamos conectados a 4G')
        }
      }, 3000);
    });

  }

  ngOnInit() {
    this.nombreUsuario = this.dbService.getUsername();

    // Obtener indicadores de API
    this.APIService.getIndicators().subscribe(data => {
      this.indicators = data;
      console.log(this.indicators);
    });

    // Obtener productos desde la base de datos
    this.loadProductos();
  }

  async loadProductos() {
    this.productos = await this.dbService.getProductos(); // Método en DbService que devuelve productos
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





// import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
// import type { Animation } from '@ionic/angular';
// import { AnimationController, IonCard } from '@ionic/angular';
// import { LoadingController } from '@ionic/angular';
// import { DbService } from '../services/db.service';
// import { APIService } from '../services/api.service';
// import { AuthService } from '../services/auth.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.page.html',
//   styleUrls: ['./home.page.scss'],
// })

// export class HomePage implements OnInit {
//   indicators: any;
//   nombreUsuario: string | null = null;

//   @ViewChild(IonCard, { read: ElementRef }) card: ElementRef<HTMLIonCardElement> | undefined;

//   private animation: Animation | undefined;

//   constructor(private animationCtrl: AnimationController,
//     private loadingCtrl: LoadingController,
//     private dbService: DbService,
//     private APIService: APIService,
//     private authService: AuthService,
//     private router: Router) {
//     this.nombreUsuario = this.dbService.getUsername(); // Recuperamos el nombre de usuario
//   }
//   ngOnInit() {
//     this.nombreUsuario = this.dbService.getUsername();

//     this.APIService.getIndicators().subscribe(data => {
//       this.indicators = data;
//       console.log(this.indicators);
//     });
//   }

//   async showLoading() {
//     const loading = await this.loadingCtrl.create({
//       duration: 500,
//     });

//     loading.present();
//   }

//   showCart() {
//     this.router.navigate(['/carrito']);
//   }

//   logout() {
//     this.authService.logout(); // Ejecuta la lógica de cierre de sesión
//     this.router.navigate(['/login']); // Redirige al usuario a la página de login
//   }
// }
