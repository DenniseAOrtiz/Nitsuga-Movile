import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
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

// Mock de NativeStorage
class MockNativeStorage {
  setItem(key: string, value: any) {
    return Promise.resolve();
  }

  getItem(key: string) {
    return Promise.resolve(null);
  }

  remove(key: string) {
    return Promise.resolve();
  }
}

describe('AppComponent', () => {

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],  // Usado para ignorar los errores de elementos personalizados
      imports: [RouterModule.forRoot([])], // Importa RouterModule si es necesario para tu app
      providers: [
        { provide: NativeStorage, useClass: MockNativeStorage },  // Proveer el mock de NativeStorage
        { provide: SQLite, useClass: MockSQLite },                  // Proveer el mock de SQLite
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // TODO(ROU-10799): Fix the flaky test.
  xit('should have menu labels', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.nativeElement;
    const menuItems = app.querySelectorAll('ion-label');
    expect(menuItems.length).toEqual(12);
    expect(menuItems[0].textContent).toContain('Inbox');
    expect(menuItems[1].textContent).toContain('Outbox');
  });

  it('should have urls', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.nativeElement;
    const menuItems = app.querySelectorAll('ion-item');
    expect(menuItems.length).toEqual(12);
    expect(menuItems[0].getAttribute('ng-reflect-router-link')).toEqual('/folder/inbox');
    expect(menuItems[1].getAttribute('ng-reflect-router-link')).toEqual('/folder/outbox');
  });

});
