import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadmoreCompetitionsComponent } from './readmore-competitions.component';

describe('ReadmoreCompetitionsComponent', () => {
  let component: ReadmoreCompetitionsComponent;
  let fixture: ComponentFixture<ReadmoreCompetitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadmoreCompetitionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadmoreCompetitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
