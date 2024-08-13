import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailsCustomerComponent } from './order-details-customer.component';

describe('OrderDetailsCustomerComponent', () => {
  let component: OrderDetailsCustomerComponent;
  let fixture: ComponentFixture<OrderDetailsCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderDetailsCustomerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDetailsCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
