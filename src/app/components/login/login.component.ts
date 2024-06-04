import { Component, inject } from '@angular/core';
import { UsersService } from '../../shared/services/users.service';
import { Router } from '@angular/router';
import { Form, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private userService=inject(UsersService);
  constructor(private router:Router){
  }
  signUp(email: HTMLInputElement,password: HTMLInputElement) {
    this.router.navigate(['/signUp', {email:email.value,password:password.value}]);
  }
  logIn(email: HTMLInputElement,password: HTMLInputElement) {
    this.userService.logIn({email :email.value , password: password.value})

    
  }
  loginForm:FormGroup=new FormGroup({

  })
  
}
