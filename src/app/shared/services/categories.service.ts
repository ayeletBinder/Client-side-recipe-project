import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/Category';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private _category:Category[]=[];
  constructor(private http:HttpClient) { }
  get GetAllCategories(){
    return this.http.get<Category[]>('http://localhost:5000/categories');
  }
  GetAllCategoryWithRecipes(){
    return this.http.get<Category[]>('http://localhost:5000/categories/withRecipes');
  }
  //by id not by name...
  GetAllCategoryWithRecipesByName(id:string){
    return this.http.get<Category>(`http://localhost:5000/categories/${id}`);
  }
}
