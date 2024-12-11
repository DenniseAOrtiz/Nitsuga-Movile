import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ResetPasswordComponent } from './reset-password.component';
import { DbService } from '../../services/db.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

// Mock para SQLite
class MockSQLite {
  create() {
    return Promise.resolve();
  }
}

// Mock para DbService
class MockDbService {
  // Define aquí cualquier método del servicio que uses en tus componentes
  someMethod() {
    return Promise.resolve();
  }
}

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResetPasswordComponent],
      imports: [IonicModule.forRoot(), FormsModule],
      providers: [
        { provide: DbService, useClass: MockDbService },
        { provide: SQLite, useClass: MockSQLite },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Prueba de campo email vacío el inicio', () => {
    // Verificar que el campo mail esté vacío al inicio
    expect(component.mail).toBe('');
  });

});
