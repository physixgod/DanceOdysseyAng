import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAprrovedJuriesComponent } from './show-aprroved-juries.component';

describe('ShowAprrovedJuriesComponent', () => {
  let component: ShowAprrovedJuriesComponent;
  let fixture: ComponentFixture<ShowAprrovedJuriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAprrovedJuriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAprrovedJuriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
