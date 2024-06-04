import { Component, inject } from '@angular/core';
import {FormGroup,FormArray,Validator,FormControl, Validators, FormBuilder, FormsModule, NgForm} from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
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


  constructor(private activatedRoute: ActivatedRoute,private fb: FormBuilder) { }
  private userService=inject(UsersService);

  email:string=this.userService.logger.email;
  password:string=this.userService.logger.password;  
  
  

  onSubmit(myform: NgForm) {
    console.log(myform);
  }
  

}
