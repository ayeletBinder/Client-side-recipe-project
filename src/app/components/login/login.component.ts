import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  signUp(name: HTMLInputElement,passWord: HTMLInputElement) {
    if(name&&passWord){
      
    }
  }
  logIn(name: HTMLInputElement,passWord: HTMLInputElement) {
    
  }

}
