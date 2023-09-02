import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TipouserisPage } from './tipouseris.page';

describe('TipouserisPage', () => {
  let component: TipouserisPage;
  let fixture: ComponentFixture<TipouserisPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TipouserisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
