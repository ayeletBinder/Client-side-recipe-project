import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../../shared/services/recipes.service';
import { Recipe } from '../../shared/models/recipe';
import { LucideAngularModule, CookingPot } from 'lucide-angular';
import { StarsDifficultyLevelPipe } from '../../shared/pipes/stars-difficulty-level.pipe';
import { TimeFormatPipe } from '../../shared/pipes/time-format.pipe';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [NgFor,LucideAngularModule,StarsDifficultyLevelPipe,TimeFormatPipe],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.scss',
})
export class RecipeDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  recipeService = inject(RecipesService);
  recipe: Recipe = {};
  numbers = Array(this.recipe.DifficultyLevel).fill(0); 
  products: string[][]=[];
  instructions: string[]=[];
  ngOnInit() {
    const idRecipe = this.route.snapshot.paramMap.get('id');
    console.log(idRecipe);
    this.recipeService.getRecipeById(idRecipe)?.subscribe((data) => {
      this.recipe = data as any;
      this.theInstructions();
      this.theProducts();
      console.log("eee",this.recipe);
    });
  }
  theProducts(){
    this.recipe.layers?.forEach((layer) => {
      if (layer.products) {
        this.products.push( layer.products.split(" ")); 
      }
    });
    console.log("oo",this.products);
  }
  theInstructions(){
    if(this.recipe.instructions!=undefined){
      debugger
      this.instructions=this.recipe.instructions?.split("."); 
      this.instructions.splice(this.instructions.length-1,1); 
      console.log('u',this.instructions);
    }
    else{
      console.log("oooooooooooooooo",this.recipe.instructions);
      
    }

  }
}
