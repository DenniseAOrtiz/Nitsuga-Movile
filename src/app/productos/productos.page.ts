import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  productos: any[] = [];
  categoriaId: number | null = null;

  constructor(
    private loadingCtrl: LoadingController, 
    private dbService: DbService, 
    private route: ActivatedRoute) { }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      duration: 500,
    });

    loading.present();
  }

  ngOnInit() {
    this.categoriaId = Number(this.route.snapshot.paramMap.get('id'));
    this.showLoading();
    this.loadProductos();
  }

  async loadProductos() {
    try {
      if (this.categoriaId) {
        this.productos = await this.dbService.getProductosPorCategoria(this.categoriaId);
      } else {
        this.productos = await this.dbService.getProductos(); 
      }
    } catch (error) {
      console.error('Error al cargar los productos', error);
    }
  }



}
