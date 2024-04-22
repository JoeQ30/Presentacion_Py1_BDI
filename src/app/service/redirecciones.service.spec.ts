import { TestBed } from '@angular/core/testing';

import { RedireccionesService } from './redirecciones.service';

describe('RedireccionesService', () => {
  let service: RedireccionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedireccionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
