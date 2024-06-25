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
import { map } from 'rxjs';
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
  recipe: Recipe = {
    layers: [{ description: '', products: '' }],
    preparationTime: 0,
  };
  p = [];
  category: any = 'aaa';
  idUpdate: string | null = null;

  successfull: boolean = false;
  // newCategory: Category |undefined;
  ngOnInit() {
    this.addLayer();
    const idRecipe = this.route.snapshot.paramMap.get('id')?.toString();
    if (idRecipe) {
      this.idUpdate = idRecipe;
      this.recipesService.getRecipeById(idRecipe)?.subscribe((data) => {
        if (data) {
          this.recipe = data as any;
          this.previewUrl =
            this.recipe && this.recipe.images ? this.recipe.images : '';
          console.log('ppp', this.recipe);
        }
      });
    }
    if (this.categoriesService.categories == undefined) {
      this.categoriesService.GetAllCategories().subscribe((data) => {
        this.categories = data as any[];
        this.categoriesService.categories?.push(...this.categories);
        console.log(
          this.categoriesService.categories,
          'this.categoriesService.categories'
        );
        console.log(data, 'data קריאת שרת');
        console.log(
          this.usersService.correctUser,
          'this.usersService.correctUser'
        );
      });
    } else {
      this.categories.push(...this.categoriesService.categories);
      console.log(this.categories, 'data קריאת שרת -ללא');
      console.log(
        this.categoriesService.categories,
        'this.categoriesService.categories'
      );
    }
  }

  get layers(): FormArray {
    return this.recipeForm.controls['layers'] as FormArray;
  }

  addLayer() {
    const layerGroup = this.fb.group({
      description: ['', Validators.required],
      products: ['', Validators.required],
    });
    this.layers.push(layerGroup);
  }
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
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
    if (this.recipeForm.invalid) {
      return;
    }
  
    const formData = new FormData();
    const p = this.recipeForm.value;
  
    formData.append('name', p.name);
    formData.append('description', p.description);
    formData.append('preparationTime', p.preparationTime.toString());
    formData.append('DifficultyLevel', p.DifficultyLevel);
    formData.append('IsPrivate', p.IsPrivate.toString());
    formData.append('instructions', p.instructions);
  
    const layers = p.layers.map((obj: any) => ({ description: obj.description, products: obj.products }));
    formData.append('layers', JSON.stringify(layers));
  
    const categories = p.category.map((category: string) => category);
    formData.append('category', JSON.stringify(categories));
  
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
  
    const user = { _id: this.usersService.user?._id, name: this.usersService.user?.name };
    formData.append('user', JSON.stringify(user));
  
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
  
    this.recipesService.addRecipe(formData).subscribe(
      (response) => {
        console.log('Recipe uploaded successfully!', response);
        this.successfull = true;
      },
      (error) => {
        console.error('Error uploading recipe:', error);
      }
    );
  }
  

  addCategory(categoryDescription: HTMLInputElement) {
    if (
      categoryDescription.value != '' &&
      this.categories.map((c) => {
        return c.description != categoryDescription.value;
      })
    ) {
      this.categories.push({
        description: categoryDescription.value,
        recipes: [{ _id: '', name: '', images: [''] }],
        _id: '',
      });
    }
  }
  selectedFile: File | null = null;
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
    if (typeof this.selectedFile === 'object' && this.selectedFile instanceof Blob) {
          const reader = new FileReader();
          reader.onloadend = () => {
            this.previewUrl = reader.result as string;
          };
          reader.readAsDataURL(this.selectedFile);
  }
  // onFileSelected(event: any) {
  //   const selectedFile = event.target.files[0];
  //   if (typeof selectedFile === 'object' && selectedFile instanceof Blob) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       this.previewUrl = reader.result as string;
  //     };
  //     reader.readAsDataURL(selectedFile);
  //   }
  }
}

// _id?:string,

// Addeddate?:Date,

// user?:userInRecipe//?
