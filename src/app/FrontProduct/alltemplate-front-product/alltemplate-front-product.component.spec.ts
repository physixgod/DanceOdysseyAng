import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlltemplateFrontProductComponent } from './alltemplate-front-product.component';

describe('AlltemplateFrontProductComponent', () => {
  let component: AlltemplateFrontProductComponent;
  let fixture: ComponentFixture<AlltemplateFrontProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlltemplateFrontProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlltemplateFrontProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
