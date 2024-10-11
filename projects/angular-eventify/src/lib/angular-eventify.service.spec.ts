import { TestBed } from '@angular/core/testing';

import { AngularEventifyService } from './angular-eventify.service';

describe('AngularEventifyService', () => {
  let service: AngularEventifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularEventifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
