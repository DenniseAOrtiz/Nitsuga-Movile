import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UpdateAdminComponent } from 'src/app/modals/update-admin/update-admin.component';
import { DbService } from 'src/app/services/db.service';
import { NavController } from '@ionic/angular';
import { UpdateUsernameClientComponent } from 'src/app/modals/update-username-client/update-username-client.component';
import { UpdatePasswordClientComponent } from 'src/app/modals/update-password-client/update-password-client.component';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.page.html',
  styleUrls: ['./admin-profile.page.scss'],
})
export class AdminProfilePage implements OnInit {
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
      component: UpdateAdminComponent,
      componentProps: { username: this.username }
    });
    await modal.present();
  }

  async openEditUsernameModal() {
    const modal = await this.modalController.create({
      component: UpdateUsernameClientComponent, 
      componentProps: { currentUsername: this.username }
    });
    await modal.present();
  
    const { data } = await modal.onWillDismiss();
    if (data?.updatedUsername) {
      this.username = data.updatedUsername;
    }
  }
  
  async openEditPasswordModal() {
    const modal = await this.modalController.create({
      component: UpdatePasswordClientComponent 
    });
    await modal.present();
  }

  goBack() {
    this.navCtrl.back();
  }
}
