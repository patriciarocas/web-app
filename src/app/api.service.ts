import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject} from 'rxjs';
import { User } from './models/user';
import { AdminComponent } from './admin/admin.component';

import { Recipe } from './models/recipe';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = "http://localhost/web-app/backend/api/";

  private GET_ALL_RECIPES_URL = `${this.baseUrl}database.php?query=recipe`;
  private GET_CLIENT_BY_ID_URL = `${this.baseUrl}database.php?query=client`;
  private GET_ADMIN_BY_ID_URL = `${this.baseUrl}database.php?query=role`;

  public user = new BehaviorSubject({ idRole: null, pass: null, email: null });

  constructor(private http: HttpClient) {
  }


  getAllRecipes(): Observable<any> {
    return this.http.get<any>(this.GET_ALL_RECIPES_URL);
  }



}

