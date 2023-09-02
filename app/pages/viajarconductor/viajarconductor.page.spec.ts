import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViajarconductorPage } from './viajarconductor.page';

describe('ViajarconductorPage', () => {
  let component: ViajarconductorPage;
  let fixture: ComponentFixture<ViajarconductorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViajarconductorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
