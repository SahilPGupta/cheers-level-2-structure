import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailViewComponent } from './cocktail-view.component';

describe('CocktailViewComponent', () => {
  let component: CocktailViewComponent;
  let fixture: ComponentFixture<CocktailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CocktailViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CocktailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
