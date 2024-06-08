import { Component, inject } from '@angular/core';
import {FormGroup,FormArray,Validator,FormControl, Validators, FormBuilder, FormsModule, NgForm} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/users';

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
  isExist=true;
  u:User={};

  onSubmit(myform: NgForm) {
    //הרשמה
    console.log(myform.value.email,"myform.name");
    console.log(myform.value.name,"myform.name");
    console.log(myform.value.agree,"myform.name");
    console.log(myform.value.password,"myform.name");
    this.u={name:myform.value.name,email:myform.value.email,password:myform.value.password,address:myform.value.address,role:"user"}
    this.userService.signUp(this.u)
    .subscribe((data)=>{
      console.log(data);
      this.isExist=true;
      this.userService.token=data.token;
      this.userService.user=data.user;            
      this.router.navigate(['recipes']);
    })
    //not secseed
    
      //לאן לשלוח אותו???
    // console.log(myform);
  }
  

}
