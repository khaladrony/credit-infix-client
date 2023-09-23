import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NatureOfBusinessComponent } from './nature-of-business.component';

describe('NatureOfBusinessComponent', () => {
  let component: NatureOfBusinessComponent;
  let fixture: ComponentFixture<NatureOfBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NatureOfBusinessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NatureOfBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
