import { Injectable, inject } from '@angular/core';
import { User } from '../models/users';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _user:User[]=[];
  logger={email:'',password:''};
  correctUser?:User;

  public get token():string|null{
    return localStorage.getItem('theToken');
  }
  
  public set token(token:string|null){
    if(token){
      localStorage.setItem('theToken',token);
    }
  }
  
  public get user(): User | null {
    const userString = localStorage.getItem('theUser');
    if (userString==='' || !userString) {
      return null;
    }
    try {
      return JSON.parse(userString) as User;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }
  
  public set user(user: User | null) {
    if (user) {
      try {
        localStorage.setItem('theUser', JSON.stringify(user));
      } catch (error) {
        console.error('Error saving user data:', error);
      }
    }
     else {
      localStorage.setItem('theUser','');
    }
  }

  private http = inject(HttpClient);
  
  private userUrl=`${environment.apiURL}/users`;
 
  get getAllUsers(){
    return this.http.get(this.userUrl); 
  }

  logIn(u:User) {
    debugger
    return this.http.post<{user:User;token:string}>(`${this.userUrl}/signin`,u);
  }

  signUp(u:User) {
    return this.http.post<{user:User;token:string}>(`${this.userUrl}/signup`,u);
  }

  logOut() {
    localStorage.removeItem('theUser');
    localStorage.removeItem('theToken');
  }

  // isTokenExpired(){
  //    const Expiry=(JSON.parse(atob(String(this.token).split('.')[1])).exp);
  //    return Math.floor((new Date()).getTime()/1000)>=Expiry;
  // }
}
