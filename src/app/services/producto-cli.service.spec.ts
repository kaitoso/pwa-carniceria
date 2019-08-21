import { TestBed } from '@angular/core/testing';

import { ProductoCliService } from './producto-cli.service';

describe('ProductoCliService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductoCliService = TestBed.get(ProductoCliService);
    expect(service).toBeTruthy();
  });
});
