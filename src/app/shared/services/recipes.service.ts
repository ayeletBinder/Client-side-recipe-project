import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Recipe } from '../models/recipe';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes:Recipe[]=[];
  private http = inject(HttpClient);
  private recipesURL = `${environment.apiURL}/recipes`
  getAllRecipe(search:string,page:number,perPage:number){
    return this.http.get(`${this.recipesURL}?search=${search}&page=${page}&perPage=${perPage}`);
  }
  getRecipeByPreparationTime(time:number){
    return this.http.get(`$/time?time=${time}`)
  }
  getRecipeById(id:string|null){
    if(id!==null)
      return this.http.get(`${this.recipesURL}/${id}`);
    return null
  }
  addRecipe(r:Recipe){
    this.recipes.push(r);
    this.http.post(this.recipesURL,r);
  }
  updateRecipe(id:string,r:Recipe){
    // this.recipes.find({_id:id});
    this.http.patch(`${this.recipesURL}/${id}`,r);

  }
  deleteRecipe(id:string){
    // this.recipes.findByIdAndDelete(id);
    this.http.delete(`${this.recipesURL}/${id}`);
  }
}
