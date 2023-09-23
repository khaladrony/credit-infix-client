import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryRiskComponent } from './country-risk.component';

describe('CountryRiskComponent', () => {
  let component: CountryRiskComponent;
  let fixture: ComponentFixture<CountryRiskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryRiskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
