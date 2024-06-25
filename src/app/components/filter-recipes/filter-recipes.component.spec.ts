import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterREcipesComponent } from './filter-recipes.component';

describe('FilterREcipesComponent', () => {
  let component: FilterREcipesComponent;
  let fixture: ComponentFixture<FilterREcipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterREcipesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterREcipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
