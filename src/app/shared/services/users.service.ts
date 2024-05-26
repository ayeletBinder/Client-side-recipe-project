import { Injectable } from '@angular/core';
import { User } from '../models/Users';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _user:User[]=[];
  constructor(private http:HttpClient) { }
  get getAllUsers(){
    return this.http.get<User[]>('http://localhost:5000/users')
  }
  
}
