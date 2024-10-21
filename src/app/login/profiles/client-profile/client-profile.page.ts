import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UpdateClientComponent } from 'src/app/modals/update-client/update-client.component';
import { DbService } from 'src/app/services/db.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.page.html',
  styleUrls: ['./client-profile.page.scss'],
})
export class ClientProfilePage implements OnInit {
  username: string = '';

  constructor(private modalController: ModalController, private dbService: DbService, private navCtrl: NavController) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  async loadUserProfile() {
    const user = await this.dbService.getCurrentUser();
    this.username = user?.username || 'Usuario';
  }

  async openEditProfileModal() {
    const modal = await this.modalController.create({
      component: UpdateClientComponent,
      componentProps: { username: this.username }
    });
    await modal.present();
  }

  goBack() {
    this.navCtrl.back();
  }
}
