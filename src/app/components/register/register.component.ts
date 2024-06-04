import { Component } from '@angular/core';
import {FormGroup,FormArray,Validator,FormControl, Validators, FormBuilder, FormsModule, NgForm} from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {


  constructor(private activatedRoute: ActivatedRoute,private fb: FormBuilder) { }

  email:string='';
  password:string='';
  ngOnInit() {
    this.email = this.activatedRoute.snapshot.params['email'];  
    this.password = this.activatedRoute.snapshot.params['password'];
    console.log(this.email+" "+this.password);
  }
  

  onSubmit(myform: NgForm) {
    console.log(myform);
  }
  

}
