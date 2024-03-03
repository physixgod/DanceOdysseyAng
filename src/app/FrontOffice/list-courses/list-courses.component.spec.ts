import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCoursesComponent } from './list-courses.component'; // Remplacez ListCompetitionsComponent par ListCoursesComponent

describe('ListCoursesComponent', () => { // Remplacez ListCompetitionsComponent par ListCoursesComponent
  let component: ListCoursesComponent; // Remplacez ListCompetitionsComponent par ListCoursesComponent
  let fixture: ComponentFixture<ListCoursesComponent>; // Remplacez ListCompetitionsComponent par ListCoursesComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCoursesComponent ] // Remplacez ListCompetitionsComponent par ListCoursesComponent
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCoursesComponent); // Remplacez ListCompetitionsComponent par ListCoursesComponent
    component = fixture.componentInstance; // Remplacez ListCompetitionsComponent par ListCoursesComponent
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
