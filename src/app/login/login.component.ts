import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
    private apiService: ApiService) { }

  ngOnInit(): void {
  }

  adminLogin() {
    this.apiService.login(this.model.email, this.model.password).subscribe(
      res => {
        if (res) {
          this.router.navigate(['./admin']);
          this.apiService.admin.next({ pass: this.model.password, email: this.model.email });
        } else {
          alert("Error when login!");
        }
      }, err => {
        alert("Error when login!");
      });
  }

  model: adminModel = {
    email: '',
    password: ''
  };

}
export interface adminModel {
  email: string;
  password: string;
}
