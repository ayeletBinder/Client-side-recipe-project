import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TimeFormatPipe } from '../../shared/pipes/time-format.pipe';
import { authGuard } from '../../shared/guards/auth.guard';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [TimeFormatPipe,CommonModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent {

  @Input()
  typeRecipe:boolean =true; 
  @Input()
  recipe:any; 
  constructor(private router:Router){}
  recipeDetails() {
    this.router.navigate(['recipeDetails',this.recipe._id,{canActivate: [authGuard] }]);
  }
  updateREcipe() {
    debugger
    this.router.navigate(['update',this.recipe._id]);
  }
  getArray(): number[] {
    return new Array(this.recipe.DifficultyLevel);
  }
  getOpositeArray(): number[] {
    return new Array(5-(this.recipe.DifficultyLevel??0));
  }
  
}
