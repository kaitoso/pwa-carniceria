import { TestBed } from '@angular/core/testing';

import { BotonClienteService } from './boton-cliente.service';

describe('BotonClienteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BotonClienteService = TestBed.get(BotonClienteService);
    expect(service).toBeTruthy();
  });
});
