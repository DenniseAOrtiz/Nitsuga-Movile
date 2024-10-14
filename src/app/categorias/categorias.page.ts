import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage {

  constructor(private loadingCtrl: LoadingController) { }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      duration: 500,
    });

    loading.present();
  }


}
