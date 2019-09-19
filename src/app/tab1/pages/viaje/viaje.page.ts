import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {
argumentos=null
  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.argumentos = this.activeRoute.snapshot.paramMap.get('id')
  }

}
