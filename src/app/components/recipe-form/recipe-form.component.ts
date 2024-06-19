import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category';
import { Recipe } from '../../shared/models/recipe';
import { RecipesService } from '../../shared/services/recipes.service';
import { UsersService } from '../../shared/services/users.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.scss',
})
export class RecipeFormComponent implements OnInit {
// add() {
//   debugger
//   this.recipesService.addRecipe({
//     name:"oooooooooooooooooo",
//   description:"aaa",
//   category:"9",
//   preparationTime:50,
//   DifficultyLevel:1,
//   Addeddate:new Date(),
//   layers:[{"description":"njyn","products":"y  y j  tj ig"}],
//   instruction:"ug i.5hyvhu.j57. j7.",
//   images:"an.png",
//   IsPrivate:false,
//   user:{name:"ayelet",_id:"663d0b74e155ea828a2594d4"}
//   }).subscribe(response => {});

// }
  categoriesService = inject(CategoriesService);
  recipesService = inject(RecipesService);
  usersService = inject(UsersService);
  recipeForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(),
    toppings: new FormControl(),
    preparationTime: new FormControl(60, [Validators.required]),
    DifficultyLevel: new FormControl('defult name', [
      Validators.required,
      Validators.min(1),
      Validators.max(5),
    ]),
    layers: new FormArray([
      new FormGroup({
        layersDescription: new FormControl('', Validators.required),
        products: new FormControl('', Validators.required),
      }),
    ]),
    ingredients: new FormControl('', [Validators.required]),
    images: new FormControl(),
    IsPrivate: new FormControl('', [Validators.required]),
    recipeTags: new FormControl('', [Validators.required]),
    instructions: new FormControl('', [Validators.required]),
  });
  // { _id:"1",description:"ttt",recipes:[{_id:'11',name:"String",images:[""] }]}
  categories: Category[] = [];
  recipe: Recipe = { layers: [{description:'',products:''}] ,preparationTime:0};
  p=[];
category: any="aaa";
  ngOnInit() {
    const idRecipe = this.route.snapshot.paramMap.get('id');
    if(idRecipe){
      this.recipesService.getRecipeById(idRecipe)?.subscribe((data)=>{
        if(data){
          this.recipe=data as any;
          console.log("ppp",this.recipe);
        }
    });}
    if(this.categoriesService.categories==undefined){
      this.categoriesService.GetAllCategories().subscribe((data)=>{
        this.categories=data as any[];
        this.categoriesService.categories?.push(...this.categories);
        console.log(this.categoriesService.categories,'this.categoriesService.categories');
        console.log(data,'data קריאת שרת');
        console.log(this.usersService.correctUser,'this.usersService.correctUser');
      })
    }
    else{
      this.categories.push(...this.categoriesService.categories);
      console.log(this.categories,'data קריאת שרת -ללא');
      console.log(this.categoriesService.categories,'this.categoriesService.categories');


    }
  }

  get layers(): FormArray {
    return this.recipeForm.controls['layers'] as FormArray;
  }

  addLayer() {
    this.layers.push(
      new FormGroup({
        layersDescription: new FormControl('', Validators.required),
        products: new FormControl('', Validators.required),
      })
    );
  }
  constructor(private fb: FormBuilder,private route:ActivatedRoute,private router:Router) {
    this.recipeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(),
      preparationTime: new FormControl(60, [Validators.required]),
      DifficultyLevel: new FormControl('defult name', [
        Validators.required,
        Validators.min(1),
        Validators.max(5),
      ]),
      layers: new FormArray([
        new FormGroup({
          layersDescription: new FormControl('', Validators.required),
          products: new FormControl('', Validators.required),
        }),
      ]),
      images: new FormControl(),
      IsPrivate: new FormControl('', [Validators.required]),
      recipeTags: new FormControl('', [Validators.required]),
      instructions: new FormControl('', [Validators.required]),
    });

  }
  onSubmit() {
    debugger

    if (this.recipeForm.invalid) {
      return; 
    }
    const formValue = this.recipeForm.value; 
    this.recipe={name:formValue.name,description:formValue.description,category:formValue.recipeTags,preparationTime:formValue.preparationTime,DifficultyLevel:formValue.DifficultyLevel,instructions:formValue.instructions , 
              layers:[formValue.layers.map((obj:any) => ({ description:obj.layersDescription ,products:obj.products }))],
              IsPrivate:formValue.IsPrivate?true:false,images:formValue.images,user:{ _id: this.usersService.user?._id,name:this.usersService.user?.name }}
    console.log(this.recipe);
    this.recipesService.addRecipe(this.recipe).subscribe(response => {
      console.log('POST request successful:', response);
    }, error => {
      console.error('Error in POST request:', error);
    });
  }
}

// _id?:string,

// Addeddate?:Date,

// user?:userInRecipe//?