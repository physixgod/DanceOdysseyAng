import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgingCriteriaComponent } from './judging-criteria.component';

describe('JudgingCriteriaComponent', () => {
  let component: JudgingCriteriaComponent;
  let fixture: ComponentFixture<JudgingCriteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JudgingCriteriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JudgingCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
