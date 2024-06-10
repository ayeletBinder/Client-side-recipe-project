import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Category } from '../models/category';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private _category:Category[]=[];
  private http = inject(HttpClient); 
  private categoriesURL = `${environment.apiURL}/categories`;

  GetAllCategories(){
    return this.http.get(`${this.categoriesURL}`);
  }
  GetAllCategoryWithRecipes(){
    return this.http.get(`${this.categoriesURL}/withRecipes`);
  }
  //by id not by name...
  GetAllCategoryWithRecipesByName(id:string){
    return this.http.get(`${this.categoriesURL}/${id}`);
  }
}
