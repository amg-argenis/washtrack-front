import { TestBed } from '@angular/core/testing';

import { Ordenservicio } from './ordenservicio';

describe('Ordenservicio', () => {
  let service: Ordenservicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ordenservicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
