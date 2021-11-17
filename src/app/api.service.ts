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
  private SAVE_RECIPE_URL = `${this.baseUrl}database.php?query=new-recipe`;
  private UPDATE_RECIPE_URL = `${this.baseUrl}database.php?query=set-recipe`;
  private LOGIN_URL = `${this.baseUrl}database.php?query=`;


  public user = new BehaviorSubject({ idRole: null, pass: null, email: null });


  constructor(private http: HttpClient) {
  }


  getAllRecipes(): Observable<any> {
    return this.http.get<any>(this.GET_ALL_RECIPES_URL);
  }
 
  saveRecipe(recipe: Recipe): Observable<any> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': " *",
      'Access-Control-Allow-Headers': "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding",
      'Access-Control-Allow-Methods': "POST, GET, OPTIONS, DELETE, PUT"      
  
    });
    let options = { headers: headers }
    return this.http.post<any>(this.SAVE_RECIPE_URL, recipe, options);

  }

  updateRecipe(recipe: Recipe): Observable<any> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': ' *',
      'Access-Control-Allow-Methods': ' GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    });
    let options = { headers: headers }
    return this.http.put(this.UPDATE_RECIPE_URL, recipe, options);
  }

  login(user: User): Observable<any> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': ' *',
      'Access-Control-Allow-Methods': ' GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    });
    let options = { headers: headers }
    return this.http.post<any>("http://localhost/web-app/backend/api/database.php?query= ", user, options)
  }
}

