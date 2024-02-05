import { TestBed } from '@angular/core/testing';

import { CarddetailsService } from './carddetails.service';

describe('CarddetailsService', () => {
  let service: CarddetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarddetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
