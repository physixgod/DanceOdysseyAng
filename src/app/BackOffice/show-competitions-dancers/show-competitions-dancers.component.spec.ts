import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCompetitionsDancersComponent } from './show-competitions-dancers.component';

describe('ShowCompetitionsDancersComponent', () => {
  let component: ShowCompetitionsDancersComponent;
  let fixture: ComponentFixture<ShowCompetitionsDancersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCompetitionsDancersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowCompetitionsDancersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
