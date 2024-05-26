import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/Recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes:Recipe[]=[];
  constructor(private http:HttpClient) { }
  getAllRecipe(){
    return this.http.get<Recipe[]>('')
  }
  getRecipeByPreparationTime(time:number){
    return this.http.get<Recipe[]>(`http://localhost:5000/recipes/time?time=${time}`)
  }
  getRecipeById(id:string){
    return this.http.get<Recipe>(`http://localhost:5000/recipes/${id}`)
  }
  addRecipe(r:Recipe){
    this.recipes.push(r);
    this.http.post('http://localhost:5000/recipes',r);
  }
  updateRecipe(id:string,r:Recipe){
    // this.recipes.find({_id:id});
    this.http.patch(`http://localhost:5000/recipes/${id}`,r);

  }
  deleteRecipe(id:string){
    // this.recipes.findByIdAndDelete(id);
    this.http.delete(`http://localhost:5000/recipes/${id}`);
  }
}
