import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyDailyRateComponent } from './currency-daily-rate.component';

describe('CurrencyDailyRateComponent', () => {
  let component: CurrencyDailyRateComponent;
  let fixture: ComponentFixture<CurrencyDailyRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyDailyRateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyDailyRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
