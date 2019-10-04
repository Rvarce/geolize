import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  login(email: string, password: string){

    this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(() => {
          
          if (this.afAuth.auth.currentUser) {
            
            this.router.navigate(['/'])           
          }
        })
        .catch(err => {
          console.log(`Ocurrio un error en el login, ${err}`)
        })
  }

  // updateProfile(){
  //   let user = this.afAuth.auth.currentUser
  //   user.updateProfile({
  //     displayName: 'Ricardo Vargas'
  //   }).then(res => {
  //       console.log(user.displayName)
  //   }).catch(err => {
  //     console.log(`Error al actualizar usuario, ${err}`)
  //   })
  // }
}