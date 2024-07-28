import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProcessSelectionComponent } from './order-process-selection.component';

describe('OrderProcessLandingPageComponent', () => {
  let component: OrderProcessSelectionComponent;
  let fixture: ComponentFixture<OrderProcessSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderProcessSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderProcessSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
