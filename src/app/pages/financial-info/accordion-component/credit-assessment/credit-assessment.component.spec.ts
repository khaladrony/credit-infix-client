import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditAssessmentComponent } from './credit-assessment.component';

describe('CreditAssessmentComponent', () => {
  let component: CreditAssessmentComponent;
  let fixture: ComponentFixture<CreditAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditAssessmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
