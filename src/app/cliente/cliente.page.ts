import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {
  categorias: any[] = [];
  productos: any[] = [];

  constructor(private dbService: DbService) {}

  async ngOnInit() {
    this.categorias = await this.dbService.getCategorias();
    this.productos = await this.dbService.getProductos();
  }

  // Método para realizar una compra
  realizarCompra(productoId: number) {
    console.log(`Comprando producto ID: ${productoId}`);
    // Implementa la lógica de compra aquí
  }
}
