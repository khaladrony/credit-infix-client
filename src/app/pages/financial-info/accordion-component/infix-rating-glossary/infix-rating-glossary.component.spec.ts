import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfixRatingGlossaryComponent } from './infix-rating-glossary.component';

describe('InfixRatingGlossaryComponent', () => {
  let component: InfixRatingGlossaryComponent;
  let fixture: ComponentFixture<InfixRatingGlossaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfixRatingGlossaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfixRatingGlossaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
