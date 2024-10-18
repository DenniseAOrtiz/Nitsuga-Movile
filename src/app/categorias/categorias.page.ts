import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {
  categorias: any[] = [];

  constructor(private loadingCtrl: LoadingController, private categoryService: CategoryService) { }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      duration: 500,
    });

    loading.present();
  }

  ngOnInit() {
    this.showLoading();
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategorias().subscribe((data) => {
      this.categorias = data;
    }, 
    (error) => {
      console.error('Error al cargar las categorías', error);
    });
  }



}
