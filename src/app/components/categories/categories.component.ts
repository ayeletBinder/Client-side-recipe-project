import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
recipesIntheCategories() {
throw new Error('Method not implemented.');
}
  categoriesService=inject(CategoriesService);
  categories:Category[]=[];
  ngOnInit() {
    this.categoriesService.GetAllCategories().subscribe((data)=>{
      this.categories=data as any[];
      console.log(data,'data');
    })
  }
}
