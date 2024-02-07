import { TestBed } from '@angular/core/testing';

import { CardDetailsService } from './carddetails.service';

describe('CarddetailsService', () => {
  let service: CardDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
