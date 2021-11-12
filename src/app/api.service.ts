import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

import { Recipe } from './models/recipe';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private baseUrl = "http://localhost/web-app/backend/api/";

  private GET_ALL_RECIPES_URL = `${this.baseUrl}database.php?query=recipe`;

  constructor(private http: HttpClient) { }

  
  getAllRecipes(): Observable<any> {
    return this.http.get<any>(this.GET_ALL_RECIPES_URL);
  }
}

