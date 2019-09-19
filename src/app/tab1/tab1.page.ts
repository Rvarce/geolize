import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  valor="Ricardo"
  constructor(private router: Router) {}
  
  //con evento click, con routerLink no es necesario
  routingAngular(){
    this.router.navigate(['/pages'])
  }
}
