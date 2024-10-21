import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { DbService } from '../services/db.service';
import { APIService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  indicators: any;
  nombreUsuario: string | null = null;

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
    this.authService.logout(); // Ejecuta la lógica de cierre de sesión
    this.router.navigate(['/login']); // Redirige al usuario a la página de login
  }
}
