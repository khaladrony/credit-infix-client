import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationInformationComponent } from './operation-information.component';

describe('OperationInformationComponent', () => {
  let component: OperationInformationComponent;
  let fixture: ComponentFixture<OperationInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
