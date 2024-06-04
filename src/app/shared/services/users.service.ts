import { Injectable, inject } from '@angular/core';
import { User } from '../models/users';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _user:User[]=[];
  correctUser?:User;
  public get token():string|null{
    return localStorage.getItem('theToken');
  }
  public set token(token:string|null){
    if(token){
      localStorage.setItem('theToken',token);
    }
  }
  private http = inject(HttpClient);
  
  private userUrl=`${environment}/users`;
 
  get getAllUsers(){
    return this.http.get(this.userUrl); 
  }
  logIn(u:User) {
    this.http.post<{user:User;token:string}>(`${this.userUrl}/signin`,u);
  }
  
}
