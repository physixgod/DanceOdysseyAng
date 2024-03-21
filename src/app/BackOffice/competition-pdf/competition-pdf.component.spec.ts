import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionPDFComponent } from './competition-pdf.component';

describe('CompetitionPDFComponent', () => {
  let component: CompetitionPDFComponent;
  let fixture: ComponentFixture<CompetitionPDFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitionPDFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitionPDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
