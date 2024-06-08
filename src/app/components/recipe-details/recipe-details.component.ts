import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../../shared/services/recipes.service';
import { Recipe } from '../../shared/models/recipe';
import { LucideAngularModule, CookingPot } from 'lucide-angular';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.scss',
})
export class RecipeDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}
  recipeService = inject(RecipesService);
  recipe: Recipe = {};
  products: string[]=[];
  instructions: string[]=[];

  ngOnInit() {
    const idRecipe = this.route.snapshot.paramMap.get('id');
    console.log(idRecipe);
    this.recipeService.getRecipeById(idRecipe)?.subscribe((data) => {
      this.recipe = data as any;
      console.log(this.recipe);
    });

  }
  productsFunction() {
      this.recipe.layers?.forEach(element => {
      element.products?.split(' ');
    });
    console.log(this.recipe.layers,"this.recipe.layers");
  }
  instructionsFunction() {
    this.recipe.instructions?.split('.');
    console.log(this.recipe.instructions,"this.recipe.instructions");
  }
    
}
