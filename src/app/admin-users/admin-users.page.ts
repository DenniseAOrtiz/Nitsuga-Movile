import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { DbService } from '../services/db.service';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ApiUserService } from '../services/api-user.service';
import { Router } from '@angular/router';
import { AddUserModalComponent } from '../modals/add-user-modal/add-user-modal.component';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.page.html',
  styleUrls: ['./admin-users.page.scss'],
})

export class AdminUsersPage implements OnInit {
  users: any[] = [];
  nombreUsuario: string | null = null;
  

  constructor(
    private apiUserService: ApiUserService, 
    private loadingCtrl: LoadingController, 
    private authService: AuthService, 
    private router: Router,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.apiUserService.getUsers().subscribe(users => {
      this.nombreUsuario = users.length > 0 ? users[0].name : null; 
    });
    this.loadUsers();
  }

  loadUsers() {
    this.apiUserService.getUsers().subscribe(data => {
      this.users = data;
    }, error => {
      alert('Error al cargar los usuarios: ' + JSON.stringify(error));
    });
  }

  openAddUserModal() {
    this.modalController.create({
      component: AddUserModalComponent
    }).then(modal => modal.present());
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      duration: 500,
    });

    loading.present();
  }

  logout() {
    this.authService.logout(); // Ejecuta la lógica de cierre de sesión
    this.router.navigate(['/login']); 
  }

  volverAdmin() {
    this.router.navigate(['/admin']); 
  }

}
