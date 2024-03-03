import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowaffectedjuriesComponent } from './showaffectedjuries.component';

describe('ShowaffectedjuriesComponent', () => {
  let component: ShowaffectedjuriesComponent;
  let fixture: ComponentFixture<ShowaffectedjuriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowaffectedjuriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowaffectedjuriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
