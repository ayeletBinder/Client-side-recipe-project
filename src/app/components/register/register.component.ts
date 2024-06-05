import { Component, inject } from '@angular/core';
import {FormGroup,FormArray,Validator,FormControl, Validators, FormBuilder, FormsModule, NgForm} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {


  constructor(private activatedRoute: ActivatedRoute,private fb: FormBuilder,private router:Router) { }
  private userService=inject(UsersService);

  email:string=this.userService.logger.email;
  password:string=this.userService.logger.password;  
  isExist=false;
  

  onSubmit(myform: NgForm) {
    //הרשמה
    console.log(myform.value,"myform.value");
    
    this.userService.signUp(myform.value)
    .subscribe((data)=>{
      console.log(data);
      this.userService.token=data.token;
      //התחברות
      //??? זה נקרא שהתחברתי ע"י signup?
      this.router.navigate(['recipes']);
    })
    //not secseed
    this.isExist=true;
      //לאן לשלוח אותו???
    console.log(myform);
  }
  

}
