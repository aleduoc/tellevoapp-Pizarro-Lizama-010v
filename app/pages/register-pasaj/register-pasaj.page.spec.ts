import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPasajPage } from './register-pasaj.page';

describe('RegisterPasajPage', () => {
  let component: RegisterPasajPage;
  let fixture: ComponentFixture<RegisterPasajPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegisterPasajPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
