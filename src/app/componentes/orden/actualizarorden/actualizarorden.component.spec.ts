import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarordenComponent } from './actualizarorden.component';

describe('ActualizarordenComponent', () => {
  let component: ActualizarordenComponent;
  let fixture: ComponentFixture<ActualizarordenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarordenComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActualizarordenComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
