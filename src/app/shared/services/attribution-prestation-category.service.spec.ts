import { TestBed } from '@angular/core/testing';

import { AttributionPrestationCategoryService } from './attribution-prestation-category.service';

describe('AttributionPrestationCategoryService', () => {
  let service: AttributionPrestationCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttributionPrestationCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
