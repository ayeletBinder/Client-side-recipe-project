import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'',loadComponent: ()=> import('./components/login/login.component').then(c=>c.LoginComponent) ,pathMatch:'full'},
    {path:'',loadComponent: ()=> import('./components/all-recipes/all-recipes.component').then(c=>c.AllRecipesComponent) },
];
