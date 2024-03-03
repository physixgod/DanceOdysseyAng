import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuryaffectationComponent } from './juryaffectation.component';

describe('JuryaffectationComponent', () => {
  let component: JuryaffectationComponent;
  let fixture: ComponentFixture<JuryaffectationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JuryaffectationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuryaffectationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
