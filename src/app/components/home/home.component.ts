import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Recipe } from '../../shared/models/recipe';
import { RecipesService } from '../../shared/services/recipes.service';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  slideshowImages = [
    { id: 1, imageUrl: 'cleo-stracuzza-wo9Ay9SPYAs-unsplash.jpg' },
    { id: 2, imageUrl: 'julien-pianetti-qIPRTMulc-g-unsplash.jpg' },
    { id: 3, imageUrl: 'kaitlyn-chow-tIElrLKqdjo-unsplash.jpg' }
  ];

  currentIndex = 0;
  recipesService=inject(RecipesService);
  recipes:Recipe[]=[];
  filterListTime:Recipe[]=[];
  filterList:Recipe[]=[];
   constructor(private router:Router) { }

   lessTime() {
    this.filterListTime = this.recipes.slice().sort((a:Recipe, b:Recipe) => (a.preparationTime??0) - (b.preparationTime??0));
    this.filterListTime = this.filterListTime.slice(0, 3);
    console.log("3 element ",this.filterListTime);
    }
    latest() {
      this.filterList = this.recipes.slice().sort((a: Recipe, b: Recipe) => {
        const dateA = a.Addeddate ? new Date(a.Addeddate) : new Date();
        const dateB = b.Addeddate ? new Date(b.Addeddate) : new Date();
    
        return dateB.getTime() - dateA.getTime(); // Sort by latest date (descending order)
      });
    
      this.filterList = this.filterList.slice(0, 3);
      console.log("3 latest elements:", this.filterList);
    }
  ngOnInit(): void {
    this.recipesService.getAllRecipe('',1,Math.min()).subscribe((data)=>{
      this.recipes=data as any[];
      console.log("public in",data);
      this.lessTime();
      this.latest();
    });
    // const lastest=
    // const popular=
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.slideshowImages.length;
    }, 3000); // Change slide every 3 seconds
  }

  currentSlide(index: number) {
    this.currentIndex = index;
  }
  navToTimeRecipe(index: number) {
    this.router.navigate(['recipeDetails',this.filterListTime[index]._id]);
  }
  navToNewRecipe(index: number) {
    this.router.navigate(['recipeDetails',this.filterList[index]._id]);
  }
}

