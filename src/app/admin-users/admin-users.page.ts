import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { DbService } from '../services/db.service';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AddUserModalComponent } from '../modals/add-user-modal/add-user-modal.component';
import { EditUserModalComponent } from '../modals/edit-user-modal/edit-user-modal.component';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.page.html',
  styleUrls: ['./admin-users.page.scss'],
})

export class AdminUsersPage implements OnInit {
  users: any[] = [];
  nombreUsuario: string | null = null;
  

  constructor(
    private dbService: DbService, 
    private loadingCtrl: LoadingController, 
    private authService: AuthService, 
    private router: Router,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    const username = this.dbService.getUsername();
    
    if (username) {
      this.nombreUsuario = username;
    } else {
      alert('No se pudo obtener el nombre del usuario');
    }
  
    this.loadUsers();
  }
  

  loadUsers() {
    this.dbService.getAllUsers().then(data => {
      this.users = data.map(user => {
        return {
          ...user,
          isAdminText: user.isAdmin === 1 ? 'Administrador' : 'Usuario'
        };
      });
    }, error => {
      alert('Error al cargar los usuarios: ' + JSON.stringify(error));
    });
  }

  deleteUser(id: number) {
    this.dbService.deleteUser(id).then(() => {
      alert('Usuario eliminado correctamente');
      this.loadUsers();
    });
  }

  openEditUserModal(user: any) {
    this.modalController.create({
      component: EditUserModalComponent,
      componentProps: { user },
    }).then(modal => {
      modal.present();
      modal.onDidDismiss().then(() => {
        this.loadUsers(); 
      });
    });
  }
  
  openAddUserModal() {
    this.modalController.create({
      component: AddUserModalComponent,
    }).then(modal => {
      modal.present();
      modal.onDidDismiss().then(() => {
        this.loadUsers(); 
      });
    });
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
