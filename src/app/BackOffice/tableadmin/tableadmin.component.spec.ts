import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableadminComponent } from './tableadmin.component';

describe('TableadminComponent', () => {
  let component: TableadminComponent;
  let fixture: ComponentFixture<TableadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
