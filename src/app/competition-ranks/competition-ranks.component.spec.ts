import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionRanksComponent } from './competition-ranks.component';

describe('CompetitionRanksComponent', () => {
  let component: CompetitionRanksComponent;
  let fixture: ComponentFixture<CompetitionRanksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitionRanksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitionRanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
