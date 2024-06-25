import { Component, OnInit, inject } from '@angular/core';
import { Recipe } from '../../shared/models/recipe';
import { AllRecipesComponent } from '../all-recipes/all-recipes.component';
import { RecipesService } from '../../shared/services/recipes.service';
import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'app-private-recipes',
  standalone: true,
  imports: [AllRecipesComponent],
  templateUrl: './private-recipes.component.html',
  styleUrl: './private-recipes.component.scss'
})
export class PrivateRecipesComponent implements OnInit {
  recipesService=inject(RecipesService);
  usersService=inject(UsersService);

  recipes: Recipe[]=[];
    ngOnInit(): void {
      this.recipesService.getAllRecipeByUserId(this.usersService.user?._id).subscribe((data)=>{
        this.recipes=data as any[];
        console.log(data,"private - recipes");
    });
  }
}
