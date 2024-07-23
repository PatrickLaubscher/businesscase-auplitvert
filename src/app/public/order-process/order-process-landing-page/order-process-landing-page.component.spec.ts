import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProcessLandingPageComponent } from './order-process-landing-page.component';

describe('OrderProcessLandingPageComponent', () => {
  let component: OrderProcessLandingPageComponent;
  let fixture: ComponentFixture<OrderProcessLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderProcessLandingPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderProcessLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
