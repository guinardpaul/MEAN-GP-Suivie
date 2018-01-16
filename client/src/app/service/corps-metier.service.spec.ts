import { TestBed, inject } from '@angular/core/testing';

import { CorpsMetierService } from './corps-metier.service';

describe('CorpsMetierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CorpsMetierService]
    });
  });

  it('should be created', inject([CorpsMetierService], (service: CorpsMetierService) => {
    expect(service).toBeTruthy();
  }));
});
