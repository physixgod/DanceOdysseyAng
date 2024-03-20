import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterjuryComponent } from './registerjury.component';

describe('RegisterjuryComponent', () => {
  let component: RegisterjuryComponent;
  let fixture: ComponentFixture<RegisterjuryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterjuryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterjuryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
