import { Component, EventEmitter, Input, OnInit, Output, inject, output } from '@angular/core';
import { RecipesService } from '../../shared/services/recipes.service';
import { Recipe } from '../../shared/models/recipe';
import { Router } from '@angular/router';
import { AllRecipesComponent } from '../all-recipes/all-recipes.component';
import { UsersService } from '../../shared/services/users.service';


@Component({
  selector: 'app-all-public-recipes',
  standalone: true,
  imports: [AllRecipesComponent],
  templateUrl: './all-public-recipes.component.html',
  styleUrl: './all-public-recipes.component.scss'
})
export class AllPublicRecipesComponent implements OnInit{
  constructor(private router:Router){}
  recipesService=inject(RecipesService);
  recipes:Recipe[]=[];

  ngOnInit(): void {
      this.recipesService.getAllRecipe('',1,12).subscribe((data)=>{
        this.recipes=data as any[];
        console.log("public in",data);
      });
  }



  // navigateToPublicRecipies() {
  //   this.router.navigate(['/recipes',{typeRecipe:"public"}]);
  // }
  // navigateToPrivateRecipies() {
  //   this.router.navigate(['/recipes',{typeRecipe:"private"}]);
  // }

  
}
