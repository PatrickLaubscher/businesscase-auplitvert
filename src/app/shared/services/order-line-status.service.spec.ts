import { TestBed } from '@angular/core/testing';

import { OrderLineStatusService } from './order-line-status.service';

describe('OrderLineStatusService', () => {
  let service: OrderLineStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderLineStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
