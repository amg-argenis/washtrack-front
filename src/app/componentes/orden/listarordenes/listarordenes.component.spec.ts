import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarordenesComponent } from './listarordenes.component';

describe('ListarordenesComponent', () => {
  let component: ListarordenesComponent;
  let fixture: ComponentFixture<ListarordenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarordenesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListarordenesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
