import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPublicRecipesComponent } from './all-public-recipes.component';

describe('AllPublicRecipesComponent', () => {
  let component: AllPublicRecipesComponent;
  let fixture: ComponentFixture<AllPublicRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllPublicRecipesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllPublicRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
