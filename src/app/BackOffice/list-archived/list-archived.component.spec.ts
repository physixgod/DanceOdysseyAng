import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArchivedComponent } from './list-archived.component';

describe('ListArchivedComponent', () => {
  let component: ListArchivedComponent;
  let fixture: ComponentFixture<ListArchivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListArchivedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListArchivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
