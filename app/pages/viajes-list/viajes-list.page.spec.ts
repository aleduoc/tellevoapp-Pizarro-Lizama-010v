import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViajesListPage } from './viajes-list.page';

describe('ViajesListPage', () => {
  let component: ViajesListPage;
  let fixture: ComponentFixture<ViajesListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViajesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
