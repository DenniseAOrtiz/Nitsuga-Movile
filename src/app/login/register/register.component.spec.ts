import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RegisterComponent } from './register.component';
import { DbService } from '../../services/db.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

// Mock de SQLite
class MockSQLite {
  async create() {
    return Promise.resolve();
  }

  async executeSql() {
    return Promise.resolve();
  }
}

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [IonicModule.forRoot()],
      providers: [
        DbService,
        { provide: SQLite, useClass: MockSQLite } // Aquí configuramos el mock
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('no debería mostrar error si el campo username no está vacío', async () => {
    // Asigna un nombre de usuario válido
    component.username = 'testUser';
    component.mail = 'test@example.com';
    component.password = 'password123';
    component.confirmPassword = 'password123';

    await component.register();

    // Verifica que no haya mensaje de error
    expect(component.errorMessage).toBe('');
  });
});
