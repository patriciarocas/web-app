import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
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

  constructor( private apiService: ApiService,private router: Router) { 

  }

  ngOnInit(): void {
  }

  adminLogin(){

  }


  model: loginModel = {
    email: '',
    password: ''
  }
}
export interface loginModel {
  email: string;
  password: string;
}
