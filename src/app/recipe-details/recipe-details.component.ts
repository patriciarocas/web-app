import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe';
import { ApiService } from '../api.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe[] = [];
  users: User[] = [];
  commentsByRecipe: User[] = [];
  recipeById: Recipe[] = [];
  id!: number;
 // recipeById!: string;
  recipeId!: Recipe;
 // selectedRec: Recipe = ;


  constructor(private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
 
    //   this.apiService.recipeId.subscribe(res =>{
    //   this.selectedRec = res;
    //   this.getRecipeById();
    //  })
   
  
    // this.apiService.getRecipeById().subscribe(recipeId => {
    //   this.recipeById = recipeId;
    // });
  
   }

  // public getRecipeById(){
  //   this.apiService.getRecipeById(this.selectedRec).subscribe(
  //      res =>{
  //        this.recipeById = res;
  //        console.log("recipe by id", this.recipeById);
  //      },
  //      err =>{
  //       alert("Error when try to get recipe by id!");
  //      }
  //    );
  // }


  public getCommentsByRecipe(id: any) {
    this.apiService.getCommentsByRecipe(id).subscribe(
      res => {
        this.commentsByRecipe = res;
        console.log("res", res);
      },
      err => {
        alert("Err ocured while get comments by recipe!");
      }
    )
  }


  addComment(){
    // this.model.id_recipe = this.id.toString();
    this.model.id_recipe = "" + this.id;
    this.apiService.addComment(this.model).subscribe(
      res => {
       alert("Comment added successfuly");
      },
      err => {
        alert("Error occurred while add comm!");
      }
    );
  }


  model: User = {
    query: '',
    name_user: '',
    email: '',
    comments: '',
    id_recipe: '',
    date:''
  };


  modelRec: RecipeModel = {
    id_recipe:'',
    query: '',
    name_recipe: '',
    ingredients: '',
    description: '',
    macros: '',
    image: ''
  }

}
export interface User{
  query: string;
  name_user: string;
  email:string;
  comments: string;
  id_recipe: string;
  date:string;
  
}
export interface RecipeModel{
  id_recipe?: string;
  query?:string;
  name_recipe:string;
  ingredients:string;
  description:string;
  macros:string;
  image:string;
}