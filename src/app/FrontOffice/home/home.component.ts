import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username!: any;
  lastName!:any;

  constructor(private route: Router) {
  
  }
  ngOnInit() {

    this.username = sessionStorage.getItem('userName');
  
    this.lastName=sessionStorage.getItem("lastName");
    console.log(this.lastName);
  }
}
