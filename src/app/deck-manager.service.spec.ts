import { TestBed, inject } from '@angular/core/testing';

import { DeckManagerService } from './deck-manager.service';

describe('DeckManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeckManagerService]
    });
  });

  it('should be created', inject([DeckManagerService], (service: DeckManagerService) => {
    expect(service).toBeTruthy();
  }));
});
