import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AllRecipesComponent } from './components/all-recipes/all-recipes.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { adminGuard, authGuard } from './shared/guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AllPublicRecipesComponent } from './components/all-public-recipes/all-public-recipes.component';
import { PrivateRecipesComponent } from './components/private-recipes/private-recipes.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'logIn', component: LoginComponent },
    { path: 'signUp', component: RegisterComponent },
    { path: 'publicRecipes', component: AllPublicRecipesComponent },
    { path: 'privateRecipes', component: PrivateRecipesComponent },
    { path: 'recipes', component: AllRecipesComponent },
    { path: 'recipes', component: AllRecipesComponent },
    { path: 'recipeDetails/:id', component: RecipeDetailsComponent,canActivate: [authGuard] },
    { path: 'categories', component: CategoriesComponent },
    { path: 'addRecipe', component: RecipeFormComponent ,canActivate: [authGuard] },//,canActivate: [authGuard]
    { path: 'update', component: RecipeFormComponent ,canActivate: [authGuard] },//,canActivate: [authGuard]
    { path: 'AllUsers', component: AllRecipesComponent, canActivate:[adminGuard]},
];
