// block-user-modal.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { DbService } from '../../services/db.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-block-user-modal',
  templateUrl: './block-user-modal.component.html',
  styleUrls: ['./block-user-modal.component.scss'],
})
export class BlockUserModalComponent implements OnInit {
  @Input() userId!: number;
  isBlocked: number = 0;

  constructor(
    private dbService: DbService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.isBlocked = this.userService.getUserStatus(this.userId).isBlocked;
  }

  toggleBlock() {
    this.isBlocked = this.isBlocked === 1 ? 0 : 1;
    this.dbService.updateUserBlockStatus(this.userId, this.isBlocked)
      .then(() => {
        alert('Estado de bloqueo actualizado');
        this.modalController.dismiss();
      })
      .catch(error => alert('Error al actualizar bloqueo: ' + error));
  }

  dismiss() {
    this.modalController.dismiss();
  }
}

