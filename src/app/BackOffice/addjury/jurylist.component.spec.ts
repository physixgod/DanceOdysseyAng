import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JurylistComponent } from './jurylist.component';

describe('JurylistComponent', () => {
  let component: JurylistComponent;
  let fixture: ComponentFixture<JurylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JurylistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JurylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
