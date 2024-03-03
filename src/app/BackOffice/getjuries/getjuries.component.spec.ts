import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetjuriesComponent } from './getjuries.component';

describe('GetjuriesComponent', () => {
  let component: GetjuriesComponent;
  let fixture: ComponentFixture<GetjuriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetjuriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetjuriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
