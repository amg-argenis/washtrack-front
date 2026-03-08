import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorfechaingresoComponent } from './porfechaingreso.component';

describe('PorfechaingresoComponent', () => {
  let component: PorfechaingresoComponent;
  let fixture: ComponentFixture<PorfechaingresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PorfechaingresoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PorfechaingresoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
