import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Recipe } from '../models/recipe';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Form } from '@angular/forms';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private recipes: Recipe[] = [];
  private http = inject(HttpClient);
  private recipesURL = `${environment.apiURL}/recipes`;
  getAllRecipe(search: string, page: number, perPage: number) {
    return this.http.get(
      `${this.recipesURL}?search=${search}&page=${page}&perPage=${perPage}`
    );
  }
  getAllRecipeByUserId(id: string | undefined) {
    return this.http.get(`${this.recipesURL}/getByUserId/:${id}`);
  }
  getRecipeByPreparationTime(time: number) {
    return this.http.get(`$/time?time=${time}`);
  }
  getRecipeById(id: string | null) {
    if (id !== null) return this.http.get(`${this.recipesURL}/${id}`);
    return null;
  }
  usersService = inject(UsersService);
  addRecipe(r: Recipe): Observable<any> {
    debugger;
    if (r.IsPrivate) {
      this.recipes.push(r);
    }
    const token = this.usersService.token;
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    r.user={_id:this.usersService.user?._id,name:this.usersService.user?.name}
    return this.http.post(this.recipesURL, r,    { headers }    );
  }

  updateRecipe(id: string, r: Recipe) {
    debugger
    const token = this.usersService.token;
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    r.user={_id:this.usersService.user?._id,name:this.usersService.user?.name};
    return this.http.patch(`${this.recipesURL}/${id}`, r, { headers } );
  }
  deleteRecipe(id: string) {
    // this.recipes.findByIdAndDelete(id);
    this.http.delete(`${this.recipesURL}/${id}`);
  }
}
