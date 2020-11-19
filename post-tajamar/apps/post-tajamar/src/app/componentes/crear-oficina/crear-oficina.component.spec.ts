import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearOficinaComponent } from './crear-oficina.component';

describe('CrearOficinaComponent', () => {
  let component: CrearOficinaComponent;
  let fixture: ComponentFixture<CrearOficinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearOficinaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearOficinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
