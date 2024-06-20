import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
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
import { FilterRecipesPipe } from '../../shared/pipes/filter-recipes.pipe';
import { MatFormField, MatFormFieldControl, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-all-recipes',
  standalone: true,
  imports: [
    
    // MatFormFieldModule, MatSelectModule,
    // MatSelect,
    // MatOption,
    // MatInputModule,
    // MatButtonModule,
    // MatCardModule,
    // MatIconModule,
    // MatFormField,
    // MatLabel,
    SearchPipe,
    FilterREcipesComponent,
    RecipeComponent,
    FormsModule,
    NgIf,
    CommonModule,
    FilterRecipesPipe,

  ],
  templateUrl: './all-recipes.component.html',
  styleUrl: './all-recipes.component.scss',
})
export class AllRecipesComponent implements OnChanges {

  // יש לי בעיה עם העברה לעמוד הבא כאשר יש לי סינון??????????
  categoriesService = inject(CategoriesService);
  recipesService = inject(RecipesService);
  usersservice = inject(UsersService);
  searchName: string = '';
  indexPage: number = 1;
  recipes: Recipe[] = [];
  moreFilter = true;
  TimePreper: number = Math.min();
  selectCategories: any = null;
  categories: Category[] = [];
  filteredRecipes: Recipe[] | undefined;
  isFilter: boolean = false;
  typeRecipe: boolean = true;
  searchByName: any;
  p:number=0;

  @Input()
  publicRecipes: Recipe[] | undefined;

  @Input()
  privateRecipes: Recipe[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private server: UsersService,
    private router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    
    this.categoriesService.GetAllCategories().subscribe((data) => {
      this.categories = data as any[];
    });
    if (changes['publicRecipes']) {
      this.filteredRecipes = changes['publicRecipes'].currentValue;
      console.log("this.filteredRecipes",this.filteredRecipes);
      
    }
    if (changes['privateRecipes']) {
      this.filteredRecipes = changes['privateRecipes'].currentValue;
    }
  }

  unsearch() {
    this.indexPage=1
    this.filteredRecipes = this.recipes;
    this.TimePreper = Math.min();
    this.selectCategories = null;
    this.searchName='';
    this.isFilter=false;
    this.recipesService.getAllRecipe('',1,Math.min()).subscribe((data)=>{
      this.recipes=data as any[];
      this.filteredRecipes=this.recipes;
      console.log("public in",data);
    });
  }

  searchby() {
    this.isFilter=true;
    this.recipesService.getAllRecipe('',1,Math.min()).subscribe((data)=>{
      this.recipes=data as any[];
      this.filteredRecipes=this.recipes;
      console.log("public in",data);
    });
    }



  searchByCaegory(arg0: any) {
    this.selectCategories = arg0.value;
    this.indexPage=1;
  }

  movePage(index: number) {
    if (!this.isFilter) {
      console.log("p",this.p);
      if (index === 1 || this.p!== 0) {
        this.recipesService
          .getAllRecipe(this.searchName, 1+index+this.p, 12)
          .subscribe((data) => {
            this.filteredRecipes = data as any[];
          });
        this.indexPage = 1;
        this.p+=index;
      }
    } 
    else {
       // this.filteredRecipes = this.recipes.slice(
        //   (this.indexPage - 1) * 12 + 1,
        //   this.indexPage * 12
        // );
        // if (!this.filteredRecipes[0]) {
        if (false) {
          //לא לתת להתקדם לעמוד הבא...
        }
        else{
          this.indexPage+=index;
        }
    }
  }

  search(search: string) {
    debugger
    this.searchName = search;
    this.recipesService.getAllRecipe(search,1, Math.min()).subscribe((data) => {
      this.recipes = data as any[];
      this.filteredRecipes = this.recipes;
      this.indexPage=1;
      console.log(this.filteredRecipes,"filteredRecipes111111111111");
    });
   }

}
