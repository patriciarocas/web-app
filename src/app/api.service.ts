import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from './models/user';
import { Recipe } from './models/recipe';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = "http://localhost/web-app/backend/api/";

  private GET_ALL_RECIPES_URL = `${this.baseUrl}database.php?query=recipe`;
 // private GET_ALL_COMMENTS_URL = `${this.baseUrl}database.php?query=user`;
  private GET_COMMENTS_BY_RECIPE_URL = `${this.baseUrl}database.php?query=get-comm&id_recipe=`;
  private GET_RECIPE_BY_ID_URL = `${this.baseUrl}database.php?query=get-recipeId&id_recipe=`;

  private SAVE_RECIPE_URL = `${this.baseUrl}database.php`;
  private ADD_COMMENTS_URL = `${this.baseUrl}database.php`;

  private UPDATE_RECIPE_URL = `${this.baseUrl}database.php`;
  private LOGIN_ADMIN_URL = `${this.baseUrl}database.php?query=get-admin`;

  private DELETE_RECIPE_BY_ID_URL = `${this.baseUrl}database.php`;


  public user = new BehaviorSubject({ pass: '', email: '' });
  public recipeId = new BehaviorSubject<string>("");


  constructor(private http: HttpClient) { 
  }


  getAllRecipes(): Observable<any> {
    return this.http.get<any>(this.GET_ALL_RECIPES_URL);
  }

  getRecipeById(id:any): Observable<any> {
    return this.http.get<any>(this.GET_RECIPE_BY_ID_URL + `${id}`);
  }

  // public getRecipeById(): Observable<string> {
  //   return this.recipeId.asObservable();
  // }

  saveRecipe(recipe: Recipe): Observable<any> {
    recipe.query = "new-recipe";
    return this.http.post('/api/database.php', recipe);
  }

  updateRecipe(recipe: Recipe): Observable<any> {
    recipe.query = "set-recipe";
    //recipe.id = id;
    return this.http.put('/api/database.php', recipe);
  }

  deleteRecipeById(recipe: Recipe): Observable<any> {
    const r = {
      query: "remove-recipe",
      id_recipe: recipe.id_recipe
    }
    return this.http.post('/api/database.php', r);
  }

  // getAllComments(): Observable<any> {
  //   return this.http.get<any>(this.GET_ALL_COMMENTS_URL);
  // }

  getCommentsByRecipe(id: any): Observable<any> {
    return this.http.get<any>(this.GET_COMMENTS_BY_RECIPE_URL + `${id}`);
  }

  addComment(user: User): Observable<any> {
    user.query = "add-comm";
    return this.http.post('/api/database.php', user);
  }

  
  login(email: string, password: string): Observable<any> {
    return this.http.get<any>(`${this.LOGIN_ADMIN_URL}&email=${email}&password=${password}`);
  }
}

