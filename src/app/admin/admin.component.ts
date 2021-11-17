import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Recipe } from '../models/recipe';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  password!: string;
  email!: string;
  isLogged = false;
  isAdmin = false;
  isSuccess: boolean = false;
  recipe: Recipe[] = [];
  recipeName = "";
  currentRecipe: any = null;


  constructor( private apiService: ApiService,private router: Router) { 

  }

  ngOnInit(): void {
  }
  
  adminLogin(){

  }
  
 public addRecipe(){
   console.log(this.modelRec);
    this.apiService.saveRecipe(this.modelRec).subscribe(
      res => {
        alert('Success!');
        this.isSuccess = true;
        this.recipeName = this.modelRec.name_recipe + " " + this.modelRec.ingredients + " " + this.modelRec.description;
      },
      err => {
        alert("An error has occurred while saving recipe!");
      }
    );
  }

  public updateRecipe(recipe: Recipe) {
    this.apiService.updateRecipe(recipe).subscribe(
      res => {
        alert("Recipe has been changed successfully!");
      },
      err => {
        alert("An error has occurred while update recipe!");
      }
    );
  }


  modelRec: recipeModel = {
  query: 'new-recipe',
  id_recipe:'',
  name_recipe: '',
  ingredients: '',
  description: '',
  macros: '',
  image:''
}

  model: adminModel = {
    email: '',
    password: ''
  }
}
export interface recipeModel{
  query:string;
  id_recipe:string;
  name_recipe:string;
  ingredients:string;
  description:string;
  macros:string;
  image:string;
}
export interface adminModel {
  email: string;
  password: string;
}
