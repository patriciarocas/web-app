import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data = [
    { img: "assets/img15.jpg", title: "Slide 1" },
    { img: "assets/img8.jpg", title: "Slide 2" },
    { img: "assets/img10.jpg", title: "Slide 3" }

  ];
  constructor() { }

  ngOnInit(): void {

  }

}
