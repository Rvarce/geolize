import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TaskService } from "../../../service/task.service";
import { Task } from 'src/app/interface/task';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {
argumentos=null
userId: string
lista: Task[]
  constructor(private activeRoute: ActivatedRoute, private taskService: TaskService) { }

  ngOnInit() {
    this.argumentos = this.activeRoute.snapshot.paramMap.get('iditem')
    console.log(this.argumentos)
  }

  getAllTask() {
    this.taskService.getAllTask().subscribe(tasks => {
      console.log(tasks)
    })
  }

  getTask(id) {
    this.taskService.getTask(id).subscribe(task => {
      console.log(task)
    })
  }

  createTask(){
    const task = {
      userId: '1',
      id: '201',      
      title: 'Prueba ceacion',
      completed: true
    };
    this.taskService.createTask(task).subscribe((newTask) => {
      console.log(newTask)
    })
  }

  removeTask(){
    this.taskService.removeTask("201").subscribe((taskRemoved) => {
      console.log("taskRemoved")
    })
  }

  getTaskForUser(){
    
    this.taskService.getTaskForUser(this.userId).subscribe((taskForUser) => {
      this.lista = taskForUser
      console.log(taskForUser)
    })
  }

}
