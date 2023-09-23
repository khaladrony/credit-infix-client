import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateStructureComponent } from './corporate-structure.component';

describe('CorporateStructureComponent', () => {
  let component: CorporateStructureComponent;
  let fixture: ComponentFixture<CorporateStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateStructureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporateStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
