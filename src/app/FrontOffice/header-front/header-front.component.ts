import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-header-front',
  templateUrl: './header-front.component.html',
  styleUrls: ['./header-front.component.css']
})
export class HeaderFrontComponent {
  constructor(private router: Router){

  }
signOut(){
  sessionStorage.clear;
  this.router.navigate(['/login']);

}
}
