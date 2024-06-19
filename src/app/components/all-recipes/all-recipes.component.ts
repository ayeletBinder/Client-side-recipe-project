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
import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-all-recipes',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
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
//       ev.selectCategory +
//       '00000' +
//       ev.time +
//       'vvvvvvvvvvv'
//   );
// }


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
  }

  movePage(index: number) {
    if (!this.isFilter) {
      console.log('indexPage', this.indexPage, 'index', index);
      if (index === 1 || this.indexPage !== 1) {
        this.indexPage += index;
        this.recipesService
          .getAllRecipe(this.searchName, this.indexPage, 12)
          .subscribe((data) => {
            this.recipes = data as any[];
            debugger;
            this.filteredRecipes = this.recipes;
            console.log(data);
          });
      }
    } 
  //   else {
  //     if (index === 1) {
  //       this.filteredRecipes = this.recipes.slice(
  //         (this.indexPage - 1) * 12 + 1,
  //         this.indexPage * 12
  //       );
  //       if (!this.filteredRecipes[0]) {
  //         //לא לתת להתקדם לעמוד הבא...
  //       }
  //       this.indexPage++;
  //     } else {
  //       this.filteredRecipes = this.recipes.slice(
  //         (this.indexPage - 1) * 12 - 12,
  //         (this.indexPage - 1) * 12
  //       );
  //       if (!this.filteredRecipes[0]) {
  //         //לא לתת להתקדם לעמוד הבא...
  //       }
  //       this.indexPage--;
  //     }
  //   }
  }

  search(search: string) {
    debugger
    this.searchName = search;
    this.recipesService.getAllRecipe(search, 1, Math.min()).subscribe((data) => {
      this.recipes = data as any[];
      this.filteredRecipes = this.recipes;
      console.log(this.filteredRecipes,"filteredRecipes111111111111");
    });
  }

}
