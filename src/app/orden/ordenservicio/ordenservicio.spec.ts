import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ordenservicio } from './ordenservicio';

describe('Ordenservicio', () => {
  let component: Ordenservicio;
  let fixture: ComponentFixture<Ordenservicio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ordenservicio],
    }).compileComponents();

    fixture = TestBed.createComponent(Ordenservicio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
