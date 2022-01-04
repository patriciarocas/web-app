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
  private GET_COMMENTS_BY_RECIPE_URL = `${this.baseUrl}database.php?query=get-comm&id_recipe=`;
  private GET_RECIPE_BY_ID_URL = `${this.baseUrl}database.php?query=get-recipeId&id_recipe=`;

  private LOGIN_ADMIN_URL = `${this.baseUrl}database.php?query=get-admin`;


  public admin = new BehaviorSubject({ pass: '', email: '' });
  public recipeId = new BehaviorSubject<string>("");


  constructor(private http: HttpClient) { 
  }


  getAllRecipes(): Observable<any> {
    return this.http.get<any>(this.GET_ALL_RECIPES_URL);
  }

  getRecipeById(id:any): Observable<any> {
    return this.http.get<any>(this.GET_RECIPE_BY_ID_URL + `${id}`);
  }

  saveRecipe(recipe: Recipe): Observable<any> {
    recipe.query = "new-recipe";
    return this.http.post('/api/database.php', recipe);
  }

  updateRecipe(recipe: Recipe): Observable<any> {
    recipe.query = "update-recipe";
    return this.http.put('/api/database.php', recipe);
  }

  deleteRecipeById(recipe: Recipe): Observable<any> {
    const r = {
      query: "remove-recipe",
      id_recipe: recipe.id_recipe
    }
    return this.http.post('/api/database.php', r);
  }

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

