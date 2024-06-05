import { Component, inject } from '@angular/core';
import { RecipesService } from '../../shared/services/recipes.service';
import { RecipeComponent } from '../recipe/recipe.component';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { FilterREcipesComponent } from '../filter-recipes/filter-recipes.component';

@Component({
  selector: 'app-all-recipes',
  standalone: true,
  imports: [FilterREcipesComponent,RecipeComponent,FormsModule,NgIf],
  templateUrl: './all-recipes.component.html',
  styleUrl: './all-recipes.component.scss'
})
export class AllRecipesComponent {


  indexPage:number=1;
  recipesService=inject(RecipesService);
  recipies:any[]=[];
  moreFilter=true;
  ngOnInit(): void{
    this.recipesService.getAllRecipe('',this.indexPage,12).subscribe((data)=>{
      this.recipies=data as any[];
      console.log(data);
    })
  }
  movePage(index: number) {
    console.log("indexPage",this.indexPage,"index",index);
    if(index===1||this.indexPage!==1){
      this.indexPage+=index;
      this.recipesService.getAllRecipe('',this.indexPage,12).subscribe((data)=>{
        this.recipies=data as any[];
        console.log(data);
      })
    }
  }
}