import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoCategoriasComponent } from './historico-categorias.component';

describe('HistoricoCategoriasComponent', () => {
  let component: HistoricoCategoriasComponent;
  let fixture: ComponentFixture<HistoricoCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoCategoriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
