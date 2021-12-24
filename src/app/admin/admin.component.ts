import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Recipe } from '../models/recipe';
import { Form, NgForm } from '@angular/forms';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  isSuccess: boolean = false;
  recipe: Recipe[] = [];
  recipeName = "";
  showRecipes: boolean = false;
  showRec: boolean = false;
  updateRec: boolean = false;
  recipeId!: Recipe;

  constructor(private apiService: ApiService, private router: Router) {

  }


  ngOnInit(): void {
  }


  toggleRecipe() {
    this.showRecipes = !this.showRecipes;
    this.getAllRecipes();

  }
  formAddRecipe() {
    this.showRec = !this.showRec;
  }

  public getAllRecipes() {
    this.apiService.getAllRecipes().subscribe(
      res => {
        // this.currentRecipe = res;
        this.recipe = res;
      },
      err => {
        alert("Error occurred while get all recipes!");
      }
    );
  }

  public getRecipeById(recipe: Recipe) {
    this.recipeId = recipe;
    console.log("recipe by id", this.recipeId);
    this.apiService.recipeId.next(recipe.id_recipe!);

  }

  public addRecipe() {
    this.apiService.saveRecipe(this.modelRec).subscribe(
      res => {
        alert('Success!');
        this.isSuccess = true;
      },
      err => {
        alert("An error has occurred while saving recipe!");
      }
    );
  }

  public updateRecipe(recipe: Recipe) {
    let recObj = {
      id_recipe: '',
      query: 'set-recipe',
      name_recipe: '',
      ingredients: '',
      description: '',
      macros: '',
      image: ''
    }
    this.apiService.updateRecipe(recipe).subscribe(
      res => {
        this.currentRecipe = res;
        console.log("current rec", this.currentRecipe);
        alert("Recipe has been changed successfully!");
      },
      err => {
        alert("An error has occurred while update recipe!");
      }
    );
  }

  public deleteRecipe(recipe: Recipe) {
    if (confirm("Are you sure you want to delete this recipe?")) {
      this.apiService.deleteRecipeById(recipe).subscribe(
        res => {
          alert("Recipe has been delete successfully!");
          let removedRecipe = this.recipe.filter(item => item.id_recipe !== recipe.id_recipe); // recipe = 1 2 3 .4. 5 => [1, 2, 3, 5]
          this.recipe = removedRecipe;
        },
        err => {
          alert("An error has occurred while delete recipe!");
        }
      );
    }
  }


  modelRec: recipeModel = {
    query: '',
    name_recipe: '',
    ingredients: '',
    description: '',
    macros: '',
    image: ''
  }

  //get data from recipe and save in currentRecipe
  currentRecipe = {
    query: '',
    id_recipe: '',
    name_recipe: '',
    ingredients: '',
    description: '',
    macros: '',
    image: ''
  }
}
export interface recipeModel {
  id_recipe?: string;
  query?: string;
  name_recipe: string;
  ingredients: string;
  description: string;
  macros: string;
  image: string;
}
