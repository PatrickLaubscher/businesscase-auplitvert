import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributionOrderComponent } from './attribution-order.component';

describe('AttributionOrderComponent', () => {
  let component: AttributionOrderComponent;
  let fixture: ComponentFixture<AttributionOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttributionOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttributionOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
