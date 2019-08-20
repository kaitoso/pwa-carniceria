import { TestBed } from '@angular/core/testing';

import { BotonService } from './boton.service';

describe('BotonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BotonService = TestBed.get(BotonService);
    expect(service).toBeTruthy();
  });
});
