import { Component, inject } from '@angular/core';
import { RecipesService } from '../../shared/services/recipes.service';
import { RecipeComponent } from '../recipe/recipe.component';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { FilterREcipesComponent } from '../filter-recipes/filter-recipes.component';
import { Recipe } from '../../shared/models/recipe';
import { SearchPipe } from '../../shared/search.pipe';
import { UsersService } from '../../shared/services/users.service';
import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category';

@Component({
  selector: 'app-all-recipes',
  standalone: true,
  imports: [SearchPipe,FilterREcipesComponent,RecipeComponent,FormsModule,NgIf],
  templateUrl: './all-recipes.component.html',
  styleUrl: './all-recipes.component.scss'
})
export class AllRecipesComponent {

  usersservice=inject(UsersService);
  searchName:string=''
  indexPage:number=1;
  recipesService=inject(RecipesService);
  recipies:Recipe[]=[];
  moreFilter=true;
  searchByName: string='';
  TimePreper: number=Math.max();
  recipes: Recipe[] = [];
  categoriesService=inject(CategoriesService);
  categories:Category[]=[];



  

  ngOnInit(ev:Recipe[]): void{
    this.recipesService.getAllRecipe('',this.indexPage,12).subscribe((data)=>{
      this.recipies=data as any[];
      console.log(data);
    });
    this.categoriesService.GetAllCategories().subscribe((data)=>{
      this.categories=data as any[];
      console.log(data,'data');
    })

    /////////////
    // this.recipies.push(...ev);
    // console.log(this.recipies,'this.recipies');
    ////
    // this.recipesService.getAllRecipeByUserId(this.usersservice.correctUser?._id).subscribe((data)=>{
    //   this.recipies=data as any[];
    //   console.log(data);
    // });
  }
  filteredRecipes: Recipe[] = [];

  searchByTimePreper(time: number) {
    debugger; 
    this.filteredRecipes = this.recipes.filter(recipe => recipe.preparationTime && recipe.preparationTime <= time);

    if (this.filteredRecipes) {
      console.log("Found recipe:", this.filteredRecipes);
    } else {
      console.log("No recipe found with preparation time <= ", time, "minutes");
    }
  
  }

  movePage(index: number) {
    console.log("indexPage",this.indexPage,"index",index);
    if(index===1||this.indexPage!==1){
      this.indexPage+=index;
      this.recipesService.getAllRecipe(this.searchName,this.indexPage,12).subscribe((data)=>{
        this.recipies=data as any[];
        console.log(data);
      })
    }
  }
  
  search(search: string) {
    this.searchName=search;
    this.recipesService.getAllRecipe(search,1,12).subscribe((data)=>{
      this.recipies=data as any[];
  })
  }

  moreFilters(ev:{DifficultyLevel:number,selectCategory:any,time:number}){
    console.log(ev.DifficultyLevel+'vvvvvvvvvvv'+ev.selectCategory+'00000'+ev.time+'vvvvvvvvvvv');
  }
 
}