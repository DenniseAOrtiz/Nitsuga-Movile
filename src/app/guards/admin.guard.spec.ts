import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { DbService } from '../services/db.service';
import { of } from 'rxjs';

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let dbServiceSpy: jasmine.SpyObj<DbService>;
  let router: Router;

  beforeEach(() => {
    // Crear un espía para el servicio DbService
    dbServiceSpy = jasmine.createSpyObj('DbService', ['getCurrentUser']);
    
    // Configurar el entorno de pruebas
    TestBed.configureTestingModule({
      imports: [RouterTestingModule], // Usamos RouterTestingModule para pruebas de navegación
      providers: [
        AdminGuard,  // Inyectamos el AdminGuard
        { provide: DbService, useValue: dbServiceSpy },  // Usamos un mock del servicio DbService
        Router  // Inyectamos Router
      ]
    });

    // Obtener instancias del guardia y el router
    guard = TestBed.inject(AdminGuard);
    router = TestBed.inject(Router);
  });

  // Prueba que el guardia sea creado correctamente
  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  // Prueba si se permite la navegación cuando el usuario es administrador
  it('Prueba si permite la navegacion a la vista admin si cumple con el rol', async () => {
    // Simulamos que el usuario es un administrador
    dbServiceSpy.getCurrentUser.and.returnValue(Promise.resolve({ isAdmin: true }));

    const result = await guard.canActivate({} as any, {} as any);  // Ejecutamos canActivate
    expect(result).toBe(true);  // Si es admin, la navegación debe ser permitida
  });

  // Prueba si se redirige al login cuando el usuario no es administrador
  it('Prueba si permite la navegacion a la vista home si cumple con el rol de cliente', async () => {
    // Simulamos que el usuario no es un administrador
    dbServiceSpy.getCurrentUser.and.returnValue(Promise.resolve({ isAdmin: false }));

    // Espiamos el método de redirección
    const navigateSpy = spyOn(router, 'navigate');

    const result = await guard.canActivate({} as any, {} as any);  // Ejecutamos canActivate
    
    expect(result).toBe(false);  // Si no es admin, la navegación debe ser bloqueada
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);  // Se debe redirigir al login
  });
});
