import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TipoUserPage } from './tipo-user.page';

describe('TipoUserPage', () => {
  let component: TipoUserPage;
  let fixture: ComponentFixture<TipoUserPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TipoUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
