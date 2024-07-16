import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestationFormComponent } from './prestation-form.component';

describe('PrestationFormComponent', () => {
  let component: PrestationFormComponent;
  let fixture: ComponentFixture<PrestationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrestationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
