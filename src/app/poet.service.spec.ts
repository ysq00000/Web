import { TestBed } from '@angular/core/testing';

import { PoetService } from './poet.service';

describe('PoetService', () => {
  let service: PoetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
