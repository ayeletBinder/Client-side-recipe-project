import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { RecipesService } from '../../shared/services/recipes.service';
import { RecipeComponent } from '../recipe/recipe.component';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { FilterREcipesComponent } from '../filter-recipes/filter-recipes.component';
import { Recipe } from '../../shared/models/recipe';
import { SearchPipe } from '../../shared/search.pipe';
import { UsersService } from '../../shared/services/users.service';
import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-all-recipes',
  standalone: true,
  imports: [SearchPipe,FilterREcipesComponent,RecipeComponent,FormsModule,NgIf,CommonModule],
  templateUrl: './all-recipes.component.html',
  styleUrl: './all-recipes.component.scss'
})
export class AllRecipesComponent implements OnChanges{

// יש לי בעיה עם העברה לעמוד הבא כאשר יש לי סינון??????????


  usersservice=inject(UsersService);
  searchName:string=''
  indexPage:number=1;
  recipesService=inject(RecipesService);
  recipes:Recipe[]=[];
  moreFilter=true;
  searchByName: string='';
  TimePreper: number=Math.min();
  selectCategories:any=null;
  categoriesService=inject(CategoriesService);
  categories:Category[]=[];
  filteredRecipes: Recipe[]|undefined;

  @Input()
  publicRecipes:Recipe[] | undefined;

  @Input()
  privateRecipes:Recipe[] | undefined;

  typeRecipe:boolean=true
  constructor(private route: ActivatedRoute, private server: UsersService, private router: Router){}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['publicRecipes']) {
      console.log('pu changed from', changes['publicRecipes'].previousValue, 'to', changes['publicRecipes'].currentValue);
      this.filteredRecipes=changes['publicRecipes'].currentValue;
      console.log(this.filteredRecipes,"pppppp");
      }
      if (changes['privateRecipes']) {
        console.log('pri changed from', changes['privateRecipes'].previousValue, 'to', changes['privateRecipes'].currentValue);
        this.filteredRecipes=changes['privateRecipes'].currentValue;
      }
    }

  // ngOnInit(ev:Recipe[]): void{
  //   debugger
  //   this.filteredRecipes=this.publicRecipes??this.privateRecipes;
  //   console.log("filteredRecipes",this.filteredRecipes);
  //   console.log("publicRecipes",this.publicRecipes);
  //   console.log("privateRecipes",this.privateRecipes);
    
  //   //  this.recipesService.getAllRecipe('',this.indexPage,12).subscribe((data)=>{
  //   //   this.recipes=data as any[];
  //   //   this.filteredRecipes=this.recipes;
  //   //   console.log(data);
  //   // });
  //   // this.typeRecipe = this.route.snapshot.paramMap.get('typeRecipe');
  //   // if(this.typeRecipe==="private"){
  //   //   debugger
  //   //   this.recipesService.getAllRecipeByUserId(this.usersservice.user?._id).subscribe((data)=>{
  //   //     this.recipes=data as any[];
  //   //     this.filteredRecipes=this.recipes;
  //   //     console.log(data,"private - recipes");
  //   // });}
  //   // else{
  //   //   debugger
  //   //   this.recipesService.getAllRecipe('',this.indexPage,12).subscribe((data)=>{
  //   //     this.recipes=data as any[];
  //   //     this.filteredRecipes=this.recipes;
  //   //     console.log(data);
  //   //   });
  //   // }
  //   this.categoriesService.GetAllCategories().subscribe((data)=>{
  //     this.categories=data as any[];
  //     // this.selectCategories=this.categories;
  //     console.log(data,'data');
  //   })
  // }

  unsearch() {
    this.filteredRecipes=this.recipes;
    this.TimePreper=Math.min();
    this.selectCategories=null; 
  }

  searchby() {
    // this.TimePreper
    // this.selectCategories
    debugger
    console.log("selectCategories ",this.selectCategories);
    console.log("TimePreper ",this.TimePreper);

    this.filteredRecipes = this.recipes.filter(recipe => {
      // console.log("recipe.category[0]",recipe.category && recipe.category[0]);
      // console.log("time", recipe.preparationTime);
      // this.searchByName==recipe.name&&
      if(this.selectCategories)
      return recipe.category && recipe.category[0] == this.selectCategories && recipe.preparationTime && recipe.preparationTime <= this.TimePreper;
      return recipe.preparationTime && recipe.preparationTime <= this.TimePreper});
      console.log("filteredRecipes",this.filteredRecipes);

      
  }
  

  searchByTimePreper(time: number) {
    // this.filteredRecipes=this.recipes;
    // this.filteredRecipes = this.recipes.filter(recipe => recipe.DifficultyLevel && recipe.DifficultyLevel <= time);
    // if (this.filteredRecipes.length>0) {
    //   console.log("Found recipe:", this.filteredRecipes);
    // } else {
    //   console.log("No recipe found with preparation time <= ", time, "minutes");
    // }
  }

  searchByCaegory(arg0: any) {
    this.selectCategories=arg0.value;
    // this.filteredRecipes=this.recipes;
    // console.log(arg0.value,"selectCategories");
    // this.filteredRecipes = this.recipes.filter(recipe => {
    //   console.log("recipe.category[0]",recipe.category &&recipe.category[0]);
    //   return recipe.category && recipe.category[0] == arg0.value});
    // if (this.filteredRecipes.length>0) {
    //   console.log("Found recipe:", this.filteredRecipes);
    // } else {
    // }
  }

  movePage(index: number) {
    console.log("indexPage",this.indexPage,"index",index);
    if(index===1||this.indexPage!==1){
      this.indexPage+=index;
      this.recipesService.getAllRecipe(this.searchName,this.indexPage,12).subscribe((data)=>{
        this.recipes=data as any[];
        debugger
        this.filteredRecipes=this.recipes;
        this.searchby();
        console.log(data);
      })
    }
  }
  
  search(search: string) {
    debugger
    this.searchName=search;
    this.recipesService.getAllRecipe(search,1,12).subscribe((data)=>{
      this.recipes=data as any[];
      this.filteredRecipes=this.recipes;
  })
  }

  moreFilters(ev:{DifficultyLevel:number,selectCategory:any,time:number}){
    console.log(ev.DifficultyLevel+'vvvvvvvvvvv'+ev.selectCategory+'00000'+ev.time+'vvvvvvvvvvv');
  }
 
}