import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearordenComponent } from './crearorden.component';

describe('CrearordenComponent', () => {
  let component: CrearordenComponent;
  let fixture: ComponentFixture<CrearordenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearordenComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CrearordenComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
