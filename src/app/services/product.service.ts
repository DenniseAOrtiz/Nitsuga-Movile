import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://Nitsuga-Movile/api'; 

  constructor(private http: HttpClient, private dbService: DbService) {}

  
  getProductosPorCategoria(categoriaId: number): Observable<any[]> {
    return from(this.dbService.getProductosPorCategoria(categoriaId));
  }  

}
