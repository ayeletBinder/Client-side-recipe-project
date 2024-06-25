import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateRecipesComponent } from './private-recipes.component';

describe('PrivateRecipesComponent', () => {
  let component: PrivateRecipesComponent;
  let fixture: ComponentFixture<PrivateRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivateRecipesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrivateRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
