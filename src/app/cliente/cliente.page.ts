import { Component, OnInit } from '@angular/core';
import { ProdService } from '../services/prod.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {
  categorias: any[] = [];
  productos: any[] = [];

  constructor(private prodService: ProdService) {}

  async ngOnInit() {
    this.categorias = await this.prodService.getCategorias();
    this.productos = await this.prodService.getProductos();
  }

  // Método para realizar una compra
  realizarCompra(productoId: number) {
    console.log(`Comprando producto ID: ${productoId}`);
    // Implementa la lógica de compra aquí
  }
}
