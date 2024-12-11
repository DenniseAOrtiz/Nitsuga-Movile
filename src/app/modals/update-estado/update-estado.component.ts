import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-update-estado',
  templateUrl: './update-estado.component.html',
  styleUrls: ['./update-estado.component.scss'],
})
export class UpdateEstadoComponent implements OnInit {
  @Input() orderId!: number; 
  @Input() currentEstado!: number; 
  nuevoEstado!: number; 

  constructor(private dbService: DbService, private modalController: ModalController) {}

  ngOnInit() {
    this.nuevoEstado = this.currentEstado;
  }

  async guardarEstado() {
    try {
      await this.dbService.updateOrderStatus(this.orderId, this.nuevoEstado);
      this.modalController.dismiss({ newEstado: this.nuevoEstado });
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
    }
  }

  cancelar() {
    this.modalController.dismiss();
  }
}
