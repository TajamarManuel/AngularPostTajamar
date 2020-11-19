import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTodoComponent } from './ver-todo.component';

describe('VerTodoComponent', () => {
  let component: VerTodoComponent;
  let fixture: ComponentFixture<VerTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerTodoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
