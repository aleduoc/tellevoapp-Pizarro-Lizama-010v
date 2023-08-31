import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewpassPage } from './newpass.page';

describe('NewpassPage', () => {
  let component: NewpassPage;
  let fixture: ComponentFixture<NewpassPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewpassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
