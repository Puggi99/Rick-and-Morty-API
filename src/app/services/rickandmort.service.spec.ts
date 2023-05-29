import { TestBed } from '@angular/core/testing';

import { RickandmortService } from './rickandmort.service';

describe('RickandmortService', () => {
  let service: RickandmortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RickandmortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
