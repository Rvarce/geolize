import { Component, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViajeService } from '../service/viaje.service';
import { Viaje } from '../interface/viaje';
import { OnInit } from '@angular/core';
import { Task } from '../interface/task';
import { AngularFireAuth } from '@angular/fire/auth';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../interface/usuario';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, AfterContentInit {
  idUsuario: string
  viajes: Viaje[] = []
  viaje: Viaje
  task: Task[] = []
  idViaje: string
  idUser: string
  usuario: Usuario

  constructor(
    private router: Router,
    private viajeService: ViajeService,
    private afAuth: AngularFireAuth,
    private usuarioService: UsuarioService) { }

  ngOnInit() {
    if (this.afAuth.auth.currentUser != null) {
      this.idUser = this.afAuth.auth.currentUser.uid
    }

    else {
      this.idUser = '7LGHJvK2boR7rwcr1HgluGOh7wt1'
    }
    this.getUsuario(this.idUser)
        .then( usuario => this.getViajesUsuario(usuario) )
        .catch( err => {console.error('Error al obtener viaje: ', err)})
  }
  ngAfterContentInit() {

  }

  getUsuario = (idUser) => {

    let viajes: string[]

    let promise = new Promise((resolve, reject) => {
      this.usuarioService.consultarUsuario(idUser).subscribe(data => {
        viajes = data.viajes
        console.log('usuario', viajes)
        resolve(viajes)
      })
      
    })

    return promise
  }

  getViajesUsuario = (viajes) => {
   
    
  
    for (let i = 0; i < viajes.length; i++) {
      const element = viajes[i];
      console.log(element)
      this.viajeService.consultarViaje(element).subscribe((data) => {
        
        if (data.estado == "Abierto") {
          this.viajes.push(data)
         // this.viajes.push(element)

        }
        
        console.log(data.idviaje)
      }
      )
    }
      
  

      
      
  }

  //con evento click, con routerLink no es necesario
  routingAngular(idItem) {
    //alert("¿Desea iniciar este viaje?")
    console.log('post', idItem)
//     var incognita = "Hola como estas"
//    var i = incognita.replace(/ /g, "")
//    var e = i.toLowerCase()
// console.log(e)
    this.router.navigate(['/viaje', idItem])
  }
}
