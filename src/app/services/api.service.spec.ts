import { TestBed } from '@angular/core/testing';
import { APIService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('APIService', () => {
  let service: APIService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Necesario para simular solicitudes HTTP
      providers: [APIService]
    });
    service = TestBed.inject(APIService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('Prueba para saber si obtengo los indicadores ecónomicos correctamente', () => {
    const mockResponse = { data: 'mockData' };  // Simulando la respuesta de la API
    
    // Realiza la solicitud GET
    service.getIndicators().subscribe(response => {
      expect(response).toEqual(mockResponse);  // Verifica que la respuesta sea la esperada
    });

    // Simula la respuesta de la API
    const req = httpMock.expectOne('https://mindicador.cl/api');
    req.flush(mockResponse);  // Responde con los datos simulados

    httpMock.verify();  // Verifica que no haya más solicitudes pendientes
  });
});
