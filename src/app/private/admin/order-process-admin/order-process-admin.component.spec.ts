import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProcessAdminComponent } from './order-process-admin.component';

describe('OrderProcessAdminComponent', () => {
  let component: OrderProcessAdminComponent;
  let fixture: ComponentFixture<OrderProcessAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderProcessAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderProcessAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
