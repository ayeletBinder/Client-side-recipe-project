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
  categoriesService = inject(CategoriesService);
  recipesService = inject(RecipesService);
  usersService = inject(UsersService);
  previewUrl: string = '';
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
    layers: new FormArray([]),
    ingredients: new FormControl('', [Validators.required]),
    images: new FormControl(),
    IsPrivate: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    instructions: new FormControl('', [Validators.required]),
  });
  // { _id:"1",description:"ttt",recipes:[{_id:'11',name:"String",images:[""] }]}
  categories: Category[] = [];
  recipe: Recipe = { layers: [{description:'',products:''}] ,preparationTime:0};
  p=[];
category: any="aaa";
idUpdate: string|null=null;

successfull: boolean=false;
  ngOnInit() {
    this.addLayer();
    const idRecipe = this.route.snapshot.paramMap.get('id')?.toString();
    if(idRecipe){
      this.idUpdate=idRecipe;
      this.recipesService.getRecipeById(idRecipe)?.subscribe((data)=>{
        if(data){
          this.recipe=data as any;
          this.previewUrl =this.recipe && this.recipe.images ? this.recipe.images : '';
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
    const layerGroup = this.fb.group({
      description: ['', Validators.required],
      products: ['', Validators.required]
    });
    this.layers.push(layerGroup);
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
      layers: new FormArray([]),
      images: new FormControl(),
      IsPrivate: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      instructions: new FormControl('', [Validators.required]),
    });

  }
  onSubmit() {
    debugger
    // const formValue = this.recipeForm.value;
    // this.recipe={name:formValue.name,description:formValue.description,category:formValue.recipeTags,preparationTime:formValue.preparationTime,DifficultyLevel:formValue.DifficultyLevel,instructions:formValue.instructions, 
    //           layers:[formValue.layers.map((obj:any) => ({ description:obj.description ,products:obj.products }))],
    //           IsPrivate:formValue.IsPrivate?true:false,images:formValue.images,user:{ _id: this.usersService.user?._id,name:this.usersService.user?.name }}
    // console.log(this.recipe);
    // this.recipesService.addRecipe(this.recipe).subscribe(response => {
    //   console.log('POST request successful:', response);
    // }, error => {
    //   console.error('Error in POST request:', error);
    // });

    if (this.recipeForm.invalid ) {
      return;
    }
    const formData = new FormData();
    formData.append('caption', this.recipeForm.value);
    if(!this.idUpdate){
    this.recipesService.addRecipe(this.recipeForm.value)
      .subscribe(response => {
        console.log('Image uploaded successfully!', response);
        this.successfull=true;
      }, error => {
        console.error('Error uploading image:', error);
      });
    }
    else{
      this.recipesService.updateRecipe(this.idUpdate,this.recipeForm.value)
      .subscribe(Response => {
        console.log('Image update successfully!', Response);
        this.successfull=true;
      }, error => {
        console.error('Error uploading image:', error);
      });
    }
  }
  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    if (typeof selectedFile === 'object' && selectedFile instanceof Blob){
      const reader = new FileReader();
      reader.onloadend = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(selectedFile);
    }
  }
}

// _id?:string,

// Addeddate?:Date,

// user?:userInRecipe//?