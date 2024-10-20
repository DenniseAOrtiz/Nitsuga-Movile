import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-editar-category-modal',
  templateUrl: './editar-category-modal.component.html',
  styleUrls: ['./editar-category-modal.component.scss'],
})
export class EditarCategoryModalComponent implements OnInit {
  categoria: any; 
  nuevoNombre: string = '';
  nuevaDescripcion: string = '';
  nuevaImagen: string = '';
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private dbService: DbService
  ) {}

  ngOnInit() {
    this.categoria = this.navParams.get('categoria');
    this.nuevoNombre = this.categoria.nombre;
    this.nuevaDescripcion = this.categoria.descripcion;
    this.nuevaImagen = this.categoria.imagen; 
  }

  async guardarCambios() {
    await this.dbService.editarCategoria(this.categoria.id, this.nuevoNombre, this.nuevaDescripcion, this.categoria.imagen);
    this.modalController.dismiss({ updated: true });
    
  }

  cerrarModal() {
    this.modalController.dismiss();
  }
}
