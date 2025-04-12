import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorBreakdownComponent } from './vendor-breakdown.component';

describe('VendorBreakdownComponent', () => {
  let component: VendorBreakdownComponent;
  let fixture: ComponentFixture<VendorBreakdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorBreakdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
