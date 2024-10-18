import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  productos: any[] = [];

  constructor(private loadingCtrl: LoadingController, private productService: ProductService) { }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      duration: 500,
    });

    loading.present();
  }

  ngOnInit() {
    this.showLoading();
    this.loadProductos();
  }

  loadProductos() {
    this.productService.getProductos().subscribe((data) => {
      this.productos = data;
    }, 
    (error) => {
      console.error('Error al cargar los productos', error);
    });
  }



}
