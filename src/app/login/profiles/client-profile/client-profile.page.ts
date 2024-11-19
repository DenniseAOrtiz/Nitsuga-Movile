import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UpdateClientComponent } from 'src/app/modals/update-client/update-client.component';
import { DbService } from 'src/app/services/db.service';
import { NavController } from '@ionic/angular';
import { UpdateUsernameClientComponent } from 'src/app/modals/update-username-client/update-username-client.component';
import { UpdatePasswordClientComponent } from 'src/app/modals/update-password-client/update-password-client.component';
import { UpdateProfilePhotoComponent } from 'src/app/modals/update-profile-photo/update-profile-photo.component';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.page.html',
  styleUrls: ['./client-profile.page.scss'],
})
export class ClientProfilePage implements OnInit {
  username: string = '';
  profilePhoto: string | null = null;

  constructor(private modalController: ModalController, private dbService: DbService, private navCtrl: NavController) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  async loadUserProfile() {
    const user = await this.dbService.getCurrentUser();
    this.username = user?.username || 'Usuario';
    this.profilePhoto = user?.profilePhoto || null;
  }

  async openEditProfileModal() {
    const modal = await this.modalController.create({
      component: UpdateClientComponent,
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

  async openEditPhotoModal() {
    const modal = await this.modalController.create({
      component: UpdateProfilePhotoComponent,
      componentProps: { profilePhoto: this.profilePhoto }
    });
  
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.profilePhoto = data;
    }
  }

  async deleteProfilePhoto() {
    const confirm = window.confirm('¿Estás seguro de que deseas eliminar tu foto de perfil?');
    if (confirm) {
      await this.dbService.deleteProfilePhoto();
      this.profilePhoto = null; 
      alert('Foto de perfil eliminada correctamente.');
    }
  }
  

  goBack() {
    this.navCtrl.back();
  }
}
