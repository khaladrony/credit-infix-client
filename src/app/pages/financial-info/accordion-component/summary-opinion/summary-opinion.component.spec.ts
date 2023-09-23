import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryOpinionComponent } from './summary-opinion.component';

describe('SummaryOpinionComponent', () => {
  let component: SummaryOpinionComponent;
  let fixture: ComponentFixture<SummaryOpinionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryOpinionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryOpinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
