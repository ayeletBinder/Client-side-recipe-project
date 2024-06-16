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
    debugger
    this.userService.logger = {email:email.value,password:password.value};
    this.router.navigate(['/signUp']);
    console.log(this.userService.logger,"loger");
  }

  logIn(email: HTMLInputElement,password: HTMLInputElement) {
    console.log(email.value," ",password.value);
    
    this.userService.logIn({email :email.value , password: password.value})
    .subscribe((data)=>{
      console.log(data);
      this.userService.token=data.token;
      this.userService.user=data.user;      
    })
    console.log(" hhd "+this.userService.token+" hhd "+
    this.userService.user,this.userService.user?.name,"name");
    this.router.navigate(['recipes']);

  }


}
