import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  recipe: Recipe[] =[];
  rating = 0; 

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getAllRecipes();
  }

  public getAllRecipes() {
    this.apiService.getAllRecipes().subscribe(
      res => {
        console.log(res);
        this.recipe = res;
      },
      err => {
        alert("Error occurred while get all recipes!");
      }
    );
  }

  
}

