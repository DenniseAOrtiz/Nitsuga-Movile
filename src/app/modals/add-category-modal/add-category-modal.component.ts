import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-category-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Agregar Categoría</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">Cerrar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-item>
        <ion-label position="floating">Nombre Categoría</ion-label>
        <ion-input [(ngModel)]="nombre"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Descripción</ion-label>
        <ion-input [(ngModel)]="descripcion"></ion-input>
      </ion-item>
      <ion-button expand="full" (click)="addCategory()">Añadir</ion-button>
    </ion-content>
  `,
})
export class AddCategoryModalComponent {
  nombre: string = '';
  descripcion: string = '';

  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss();
  }

  addCategory() {
    this.modalController.dismiss({ nombre: this.nombre, descripcion: this.descripcion });
  }
}
