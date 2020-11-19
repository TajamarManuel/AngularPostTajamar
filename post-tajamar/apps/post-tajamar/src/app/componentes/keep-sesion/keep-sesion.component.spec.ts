import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeepSesionComponent } from './keep-sesion.component';

describe('KeepSesionComponent', () => {
  let component: KeepSesionComponent;
  let fixture: ComponentFixture<KeepSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeepSesionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeepSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
