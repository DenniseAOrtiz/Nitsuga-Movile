import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-add-product-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Agregar Producto</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">Cerrar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-item>
        <ion-label position="floating">Nombre Producto</ion-label>
        <ion-input [(ngModel)]="nombre"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Descripción</ion-label>
        <ion-input [(ngModel)]="descripcion"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Precio</ion-label>
        <ion-input [(ngModel)]="precio" type="number"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">URL Imagen</ion-label>
        <ion-input [(ngModel)]="imagen"></ion-input>
      </ion-item>
      <ion-button expand="full" (click)="addProduct()">Añadir</ion-button>
    </ion-content>
  `,
})
export class AddProductModalComponent {
  nombre: string = '';
  descripcion: string = '';
  precio: number | null = null;
  imagen: string = '';
  categoriaId: number;

  constructor(private modalController: ModalController, private navParams: NavParams) {
    this.categoriaId = this.navParams.get('categoriaId');
  }

  dismiss() {
    this.modalController.dismiss();
  }

  addProduct() {
    // Aquí deberías llamar al servicio para agregar el producto
    this.modalController.dismiss();
  }
}
