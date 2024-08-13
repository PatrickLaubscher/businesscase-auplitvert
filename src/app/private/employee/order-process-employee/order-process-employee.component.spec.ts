import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProcessEmployeeComponent } from './order-process-employee.component';

describe('OrderProcessEmployeeComponent', () => {
  let component: OrderProcessEmployeeComponent;
  let fixture: ComponentFixture<OrderProcessEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderProcessEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderProcessEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
