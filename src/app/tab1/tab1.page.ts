import { Component, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViajeService } from '../service/viaje.service';
import { Viaje } from '../interface/viaje';
import { OnInit } from '@angular/core';
import { Task } from '../interface/task';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, AfterContentInit {
  idUsuario: string
  viajes: Viaje[] = []
  task: Task[] = []
  idViaje: string
  user: any
  constructor(private router: Router, private viajeService: ViajeService, private afAuth: AngularFireAuth) { }

  ngOnInit() {
 
  }
  ngAfterContentInit(){
    this.getViajesUsuario()
  }

  getViajesUsuario() {
    this.viajeService.consultarViajes().subscribe((data) => {
      this.viajes = data
      console.log(this.viajes)
    }
    )
  }

  //con evento click, con routerLink no es necesario
  routingAngular(idItem) {
    //alert("¿Desea iniciar este viaje?")
    console.log('post', idItem)
    this.router.navigate(['/viaje', idItem])
  }
}
