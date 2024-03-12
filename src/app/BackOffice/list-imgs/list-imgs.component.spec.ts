import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListImgsComponent } from './list-imgs.component';

describe('ListImgsComponent', () => {
  let component: ListImgsComponent;
  let fixture: ComponentFixture<ListImgsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListImgsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListImgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
