import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { min } from 'rxjs';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.scss'
})

export class RecipeFormComponent {
    toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];


  recipeForm:FormGroup=new FormGroup({
    name:new FormControl('',[Validators.required]),
    description:new FormControl(),
    toppings : new FormControl(),
    preparationTime:new FormControl(60,[Validators.required]),
    DifficultyLevel:new FormControl('defult name',[Validators.required,Validators.min(1),Validators.max(5)]),
    layers:new FormArray(
      [
        new FormGroup({
          layersDescription: new FormControl('', Validators.required),
          products: new FormControl('', Validators.required)
        })]
    ),
    ingredients:new FormControl('',[Validators.required]),
    images:new FormControl(),
    IsPrivate:new FormControl('',[Validators.required]),

  })
  categories: any[]=[{_id:1,description:'iiiiii'},{_id:1,description:'iiiiii'}];
  constructor(){
  }
  get layers():FormArray{
    return this.recipeForm.controls['layers'] as FormArray;
  }

  

  addLayer() {
    this.layers.push(
      new FormGroup({
        layersDescription: new FormControl('', Validators.required),
        products: new FormControl('', Validators.required)
      })
    );
  }
//  submit(){
//   if (this.recipeForm.invalid) {
//     return; // Prevent submission if form is invalid
//   }

//   const formData = new FormData();
//   const images = this.recipeForm.get('recipeImages').value as FileList;
//   for (let i = 0; i < images.length; i++) {
//     formData.append('recipeImages', images[i]);
//   }

//   // Submit the form data here (e.g., using HTTP service)
//   console.log('Form submitted:', formData);
// }
}
////////////////////////////////////////////////////////////////////////////////////////////////
// Addeddate:{type:Date,default:Date.now()},
//category
// user:{type:userMiniSchema}