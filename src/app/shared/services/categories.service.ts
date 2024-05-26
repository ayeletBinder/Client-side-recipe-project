import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private _category=Category[]=[];
  constructor(private http:HttpClient) { }
  get categories(){
    return this.http.get<Category[]>('');
  }
}
