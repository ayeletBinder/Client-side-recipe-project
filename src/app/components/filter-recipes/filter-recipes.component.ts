import { Component, EventEmitter, Output, inject, output } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatSelect } from '@angular/material/select';
import { Category } from '../../shared/models/category';
import { CategoriesService } from '../../shared/services/categories.service';
import { FormControl, FormsModule } from '@angular/forms';
import { Recipe } from '../../shared/models/recipe';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-filter-recipes',
  standalone: true,
  imports: [NgFor,MatOption,MatSelect,MatFormField,FormsModule],
  templateUrl: './filter-recipes.component.html',
  styleUrl: './filter-recipes.component.scss'
})
export class FilterREcipesComponent {
  categoriesService=inject(CategoriesService);
  categories:Category[]=[];
  c:string[]=[];
  categoryService=inject(CategoriesService);
  selectCategories= new FormControl('');
  toppings= new FormControl('');
  // Prepertiontime:number=

  @Output()
  filters:EventEmitter<{DifficultyLevel:number,selectCategory:any,time:number}>=new EventEmitter<{DifficultyLevel:number,selectCategory:any,time:number}>();

  search(DifficultyLevel:number,selectCategory:any,time:number) {
  //להביא לאבא נתונים אלה ואז הוא ישנה את הקומפוננטה - ע"י output
    this.filters.emit({DifficultyLevel,selectCategory,time});
    
    selectCategory.forEach((element:string) => {
        this.c.push(element);
    });
    console.log(selectCategory+'selectCategory');
    console.log(selectCategory.value+'selectCategory.value');
    console.log(selectCategory.select+'selectCategory.select');
    
  }

  ngOnInit() {
    if(this.categoriesService.categories===undefined){
      this.categoriesService.GetAllCategories().subscribe((data)=>{
        this.categories=data as any[];
        this.categoriesService.categories?.push(...this.categories);
        console.log(this.categoriesService.categories,'this.categoriesService.categories');
        console.log(data,'data קריאת שרת ');
      })
    }
    else{
      this.categories.push(...this.categoriesService.categories);
      console.log(this.categories,'data קריאת שרת -ללא');
      console.log(this.categoriesService.categories,'this.categoriesService.categories');

    }
  }
}
