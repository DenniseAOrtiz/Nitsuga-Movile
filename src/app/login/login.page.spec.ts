import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { DbService } from '../services/db.service';
import { LoadingController } from '@ionic/angular';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let dbServiceSpy: jasmine.SpyObj<DbService>;
  let loadingControllerSpy: jasmine.SpyObj<LoadingController>;

  beforeEach(() => {
    // Crear espías para DbService y LoadingController
    dbServiceSpy = jasmine.createSpyObj('DbService', ['login']);
    loadingControllerSpy = jasmine.createSpyObj('LoadingController', ['create']);

    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      providers: [
        { provide: DbService, useValue: dbServiceSpy },
        { provide: LoadingController, useValue: loadingControllerSpy },
      ]
    });

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Verificar si el campo username está vacío al intentar iniciar sesión', async () => {
    
    component.username = '';
    component.password = 'password123';

    
    await component.login();

    // Verifica que se establezca el mensaje de error para username vacío
    expect(component.errorMessage).toBe('El nombre de usuario es obligatorio');
    expect(component.isLoading).toBe(false);  // Verifica que isLoading se establezca en false después de la validación
  });
});


