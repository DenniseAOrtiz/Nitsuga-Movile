import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-edit-photo-cat',
  templateUrl: './edit-photo-cat.component.html',
  styleUrls: ['./edit-photo-cat.component.scss'],
})
export class EditPhotoCatComponent {
  imagen: string | null = null;

  constructor(private modalCtrl: ModalController, private dbService: DbService) { }

  async selectPhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos
    });
    this.imagen = `data:image/jpeg;base64,${image.base64String}`;
  }

  async savePhoto() {
    if (this.imagen) {
      await this.dbService.updateCategoriaPhoto(this.imagen);
      this.dismiss(this.imagen);
    }
  }

  dismiss(data: any = null) {
    this.modalCtrl.dismiss(data);
  }

}