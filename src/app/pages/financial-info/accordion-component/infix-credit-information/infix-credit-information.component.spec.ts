import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfixCreditInformationComponent } from './infix-credit-information.component';

describe('InfixCreditInformationComponent', () => {
  let component: InfixCreditInformationComponent;
  let fixture: ComponentFixture<InfixCreditInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfixCreditInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfixCreditInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
