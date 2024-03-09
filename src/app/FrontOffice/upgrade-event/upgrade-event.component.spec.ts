import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeEventComponent } from './upgrade-event.component';

describe('UpgradeEventComponent', () => {
  let component: UpgradeEventComponent;
  let fixture: ComponentFixture<UpgradeEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpgradeEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpgradeEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
