import { Component, inject } from '@angular/core';
import { RecipesService } from '../../shared/services/recipes.service';

@Component({
  selector: 'app-all-recipes',
  standalone: true,
  imports: [],
  templateUrl: './all-recipes.component.html',
  styleUrl: './all-recipes.component.scss'
})
export class AllRecipesComponent {
  recipesService=inject(RecipesService);
  recipies:any[]=[];

  ngOnInit(): void{
    this.recipesService.getAllRecipe().subscribe((data)=>{
      this.recipies=data as any[];
      console.log(data);
    })
  }
}