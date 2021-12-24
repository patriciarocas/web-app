import { Component, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../models/recipe';
import { ApiService } from '../api.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  recipe: Recipe[] = [];
  recipeId!: Recipe;
  commentsByRecipe: User[] = [];
  users: User[] = [];

  id: string | undefined;

  currentDate = new Date();
  pipe = new DatePipe('en-US');
 

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getAllRecipes();
  }

  public getAllRecipes() {
    this.apiService.getAllRecipes().subscribe(
      res => {
        this.recipe = res;
      },
      err => {
        alert("Error occurred while get all recipes!");
      }
    );
  }


  public getRecipeById(recipe: Recipe) {
    this.recipeId = recipe;
    this.id = recipe.id_recipe;
    this.apiService.recipeId.next(recipe.id_recipe!);
    this.getCommentsByRecipe(this.id);

  }

  addComment() {
    this.model.id_recipe = "" + this.id;
    console.log(this.id);
    this.apiService.addComment(this.model).subscribe(
      res => {
        alert("Comment added successfuly");
      },
      err => {
        alert("Error occurred while add comm!");
      }
    );
  }

  public getCommentsByRecipe(id: any) {
    this.apiService.getCommentsByRecipe(id).subscribe(
      res => {
        this.commentsByRecipe = res;
      },
      err => {
        alert("Err ocured while get comments by recipe!");
      }
    )
  }


  model: User = {
    query: '',
    name_user: '',
    email: '',
    comments: '',
    id_recipe: '',
    date: ''
  };

}
export interface User {
  query: string;
  name_user: string;
  email: string;
  comments: string;
  id_recipe: string;
  date:string;
}