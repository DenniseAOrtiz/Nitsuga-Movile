import { Component } from '@angular/core';
import { DbService } from './services/db.service';
import { MenuController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  dropdownOpen = false; 


  constructor(private menu: MenuController, private loadingCtrl: LoadingController) { }

  closeMenu() {
    this.menu.close();
  }
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      duration: 500,
    });

    loading.present();
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
}

