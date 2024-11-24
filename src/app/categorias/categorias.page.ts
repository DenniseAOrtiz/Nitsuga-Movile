import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})  
export class CategoriasPage implements OnInit {
  categorias: any[] = [];
  productos: any[] = [];

  constructor(
    private loadingCtrl: LoadingController, 
    private dbService: DbService, 
    private router: Router,
    private navCtrl: NavController
  ) { }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      duration: 500,
    });

    loading.present();
  }

  async ngOnInit() {
    this.categorias = await this.dbService.getCategorias();
    this.productos = await this.dbService.getProductos();
    await this.showLoading();
    await this.loadCategories();
    await this.loadProductos();
  }

  async getProductosPorCategoria(categoriaId: number) {
    return await this.dbService.getProductosPorCategoria(categoriaId);
  }

  async loadCategories() {
    this.categorias = await this.dbService.getCategorias();
  }

  async loadProductos() {
    this.productos = await this.dbService.getProductos();
  }

  async verProductos(categoriaId: number) {
    console.log(categoriaId);
    this.router.navigate(['/productos', categoriaId]);
  } 

  goBack() {
    this.navCtrl.back();
  }

}
