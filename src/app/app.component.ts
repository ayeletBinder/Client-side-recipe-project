import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersService } from './shared/services/users.service';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { CategoriesComponent } from './components/categories/categories.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,LoginComponent,RegisterComponent,CategoriesComponent,RecipeFormComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-recipe-project';
  userService=inject(UsersService);
  moreFilter=true;

  logOut() {
    this.userService.user={};
    this.userService.token='';  
  }
}
