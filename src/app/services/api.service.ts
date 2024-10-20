import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class APIService {
  
  private apiUrl = 'https://mindicador.cl/api';

  constructor(private http: HttpClient) { 
    console.log('Api Conectada');
  }

  getIndicators(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
   
}
