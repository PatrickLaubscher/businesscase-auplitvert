import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestationPriceListComponent } from './prestation-price-list.component';

describe('PrestationPriceListComponent', () => {
  let component: PrestationPriceListComponent;
  let fixture: ComponentFixture<PrestationPriceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrestationPriceListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestationPriceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
