import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViajeService } from '../service/viaje.service';
import { Viaje } from '../interface/viaje';
import { OnInit } from '@angular/core';
import { Task } from '../interface/task';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  idUsuario: string
  viajes: Viaje
  task: Task[] = []
  idViaje: string
  constructor(private router: Router, private viajeService: ViajeService, private taskService: TaskService) {}
  
  ngOnInit(){
    this.idUsuario = "2"
    this.getViajesUsuario(this.idUsuario)
    
  }

  getViajesUsuario(idUsuario){
  //   this.viajeService.getViajeForUser(this.idUsuario).subscribe((data) => {
    this.taskService.getTaskForUser(idUsuario).subscribe((data) => {
      for(let item of data){
        if(item.completed == false){
          this.task.push(item)
        }
      }
      console.log(this.task)
    }
    )
  }

  //con evento click, con routerLink no es necesario
  routingAngular(){
    //alert("¿Desea iniciar este viaje?")
    console.log(this.idViaje)
    this.router.navigate(['/pages'])
  }
}
