import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminCatPage } from './admin-cat.page';

describe('AdminCatPage', () => {
  let component: AdminCatPage;
  let fixture: ComponentFixture<AdminCatPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
