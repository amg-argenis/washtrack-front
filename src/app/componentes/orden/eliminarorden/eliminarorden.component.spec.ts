import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarordenComponent } from './eliminarorden.component';

describe('EliminarordenComponent', () => {
  let component: EliminarordenComponent;
  let fixture: ComponentFixture<EliminarordenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarordenComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EliminarordenComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
