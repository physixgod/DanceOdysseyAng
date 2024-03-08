import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieProductComponent } from './categorie-product.component';

describe('CategorieProductComponent', () => {
  let component: CategorieProductComponent;
  let fixture: ComponentFixture<CategorieProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorieProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorieProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
