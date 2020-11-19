import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesTrabajadorComponent } from './detalles-trabajador.component';

describe('DetallesTrabajadorComponent', () => {
  let component: DetallesTrabajadorComponent;
  let fixture: ComponentFixture<DetallesTrabajadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesTrabajadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesTrabajadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
