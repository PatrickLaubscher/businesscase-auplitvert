import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderRoutingComponent } from './order-routing.component';

describe('OrderRoutingComponent', () => {
  let component: OrderRoutingComponent;
  let fixture: ComponentFixture<OrderRoutingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderRoutingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
