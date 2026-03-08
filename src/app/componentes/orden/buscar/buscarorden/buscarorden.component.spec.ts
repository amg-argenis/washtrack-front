import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarordenComponent } from './buscarorden.component';

describe('BuscarordenComponent', () => {
  let component: BuscarordenComponent;
  let fixture: ComponentFixture<BuscarordenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarordenComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BuscarordenComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
