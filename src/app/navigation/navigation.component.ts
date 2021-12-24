import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isLogged!: boolean;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
  }


  logoutAdmin(){
  }
}
