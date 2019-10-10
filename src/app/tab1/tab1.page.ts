import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViajeService } from '../service/viaje.service';
import { Viaje } from '../interface/viaje';
import { OnInit } from '@angular/core';
import { Task } from '../interface/task';
import { TaskService } from '../service/task.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  idUsuario: string
  viajes: Viaje[] = []
  task: Task[] = []
  idViaje: string
  user: any
  constructor(private router: Router, private viajeService: ViajeService, private taskService: TaskService, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.user = this.afAuth.auth.currentUser
    if (this.user == null) {
      this.router.navigate(['/login'])

    }
  
    this.getViajesUsuario()

  }

  getViajesUsuario() {
    this.viajeService.consultarViajes().subscribe((data) => {
      // this.taskService.getTaskForUser(idUsuario).subscribe((data) => {
      //   for(let item of data){
      //     if(item.completed == false){
      //       this.task.push(item)
      //     }
      //   }
      //   console.log(this.task)

      this.viajes = data
      console.log(this.viajes)
    }
    )
  }

  //con evento click, con routerLink no es necesario
  routingAngular(idItem) {
    //alert("¿Desea iniciar este viaje?")
    console.log(idItem)
    this.router.navigate(['/viaje', idItem])
  }
}
