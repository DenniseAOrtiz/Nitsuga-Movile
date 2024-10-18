import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminProdPage } from './admin-prod.page';

describe('AdminProdPage', () => {
  let component: AdminProdPage;
  let fixture: ComponentFixture<AdminProdPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
