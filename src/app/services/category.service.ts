import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor( private dbService: DbService) {}

  getProductosPorCategoria(categoriaId: number): Observable<any[]> {
    return from(this.dbService.getProductosPorCategoria(categoriaId));
  }

  getProductos(): Observable<any[]> {
    return from(this.dbService.getProductos());
  }

  getCategorias(): Observable<any[]> {
    return from(this.dbService.getCategorias());
  }  

}

