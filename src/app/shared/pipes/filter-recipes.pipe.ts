import { Pipe, PipeTransform, inject } from '@angular/core';
import { Recipe } from '../models/recipe';
import { CategoriesService } from '../services/categories.service';
import { RecipesService } from '../services/recipes.service';

@Pipe({
  name: 'filterRecipes',
  standalone: true
})
export class FilterRecipesPipe implements PipeTransform {
  categoriesService = inject(CategoriesService);
  recipesService = inject(RecipesService);

  transform(arr: Recipe[]|undefined, ...args: any[]): Recipe[]|undefined {

    if(!args[0]&&args[0]!=0){
      args[0]=Math.min();
    }
    arr = arr?.filter((recipe) => {
      if (args[1])
        return (
          recipe.category &&
          recipe.category[0] == args[1] &&
          recipe.preparationTime &&
          recipe.preparationTime <= (args[0])
        );
      return (
        recipe.preparationTime && recipe.preparationTime <= args[0]
      );
    });

    console.log("args[2]",args[2]);
    console.log("12*(args[2]-1)-(12*args[2]+1)",12*(args[2]-1)-(12*args[2]+1));
    
    arr=arr?.slice(12*(args[2]-1),12*args[2]);
    return arr;
  }

}
