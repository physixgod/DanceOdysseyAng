import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveCompetitionsComponent } from './archive-competitions.component';

describe('ArchiveCompetitionsComponent', () => {
  let component: ArchiveCompetitionsComponent;
  let fixture: ComponentFixture<ArchiveCompetitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchiveCompetitionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchiveCompetitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
