import { TestBed, inject } from '@angular/core/testing';

import { ArtisansService } from './artisans.service';

describe('ArtisansService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArtisansService]
    });
  });

  it('should be created', inject([ArtisansService], (service: ArtisansService) => {
    expect(service).toBeTruthy();
  }));
});
