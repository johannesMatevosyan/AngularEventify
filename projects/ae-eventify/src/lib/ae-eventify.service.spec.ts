import { TestBed } from '@angular/core/testing';

import { AeEventifyService } from './ae-eventify.service';

describe('AeEventifyService', () => {
  let service: AeEventifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AeEventifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
