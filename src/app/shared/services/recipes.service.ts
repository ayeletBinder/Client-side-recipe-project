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
  getAllRecipe(){
    return this.http.get(this.recipesURL);
  }
  getRecipeByPreparationTime(time:number){
    return this.http.get(`$/time?time=${time}`)
  }
  getRecipeById(id:string){
    return this.http.get(`${this.recipesURL}/${id}`);
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
