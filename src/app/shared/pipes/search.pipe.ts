import { Pipe, PipeTransform, inject } from '@angular/core';
import { RecipesService } from '../services/recipes.service';
import { Recipe } from '../models/recipe';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {
    // recipesService=inject(RecipesService);
    transform( value: string | null){
    //   if (value === null) {
    //     return null;
    //   } else {
        // return recipes.filter((recipe) => {
        //   // Assuming 'value' contains the string to match
        //   return recipe.name.match(new RegExp(value, 'i')) !== null;
        // });

        // return this.recipesService.getAllRecipe(value,12,1);

    //   }
    }
}
