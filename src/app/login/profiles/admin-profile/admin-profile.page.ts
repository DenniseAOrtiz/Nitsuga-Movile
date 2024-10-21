import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.page.html',
  styleUrls: ['./admin-profile.page.scss'],
})
export class AdminProfilePage implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private dbService: DbService) {}

  ngOnInit() {
    this.loadAdminProfile();
  }

  loadAdminProfile() {
    const user = this.dbService.getUsername();
    if (user) {
      this.username = user;
    } else {
      alert('No se pudo cargar el perfil del administrador');
    }
  }

  updateProfile() {
    if (this.username && this.password) {
      // Actualizar el perfil en la base de datos
      this.dbService.updateUserProfile(this.username, this.password).then(() => {
        alert('Perfil actualizado correctamente');
      }).catch(error => {
        alert('Error al actualizar el perfil: ' + JSON.stringify(error));
      });
    } else {
      alert('Por favor, ingrese un nombre de usuario y una contraseña');
    }
  }
}
