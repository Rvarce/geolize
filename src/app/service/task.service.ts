import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Task } from './../interface/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private api = "https://jsonplaceholder.typicode.com"
  constructor(private http: HttpClient) { }

  getAllTask() {
    const path = `${this.api}/todos`
    return this.http.get<Task[]>(path)
  }

  getTask(id: string) {
    const path = `${this.api}/todos/${id}`

    return this.http.get<Task>(path)
  }

  createTask(task: Task) {
    const path = `${this.api}/todos`
    return this.http.post(path, task)
  }

  removeTask(id: string) {
    const path = `${this.api}/todos/${id}`
    return this.http.delete(path)
  }

  getTaskForUser(userId: string){
    const path = `${this.api}/todos?userId=${userId}`
    return this.http.get<Task[]>(path)

  }

}
