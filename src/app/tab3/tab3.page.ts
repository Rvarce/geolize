import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  name: string
  email: string
  photoUrl: any
  uid: string
  emailVerified: any
  phoneNumber: string

  ngOnInit(): void {
    this.cargaDatos()
  }

  constructor(private afAuth: AngularFireAuth) { }

  user = this.afAuth.auth.currentUser;

  cargaDatos() {

    if (this.user != null) {
      this.name = this.user.displayName
      this.email = this.user.email
      this.photoUrl = this.user.photoURL
      this.emailVerified = this.user.emailVerified
      this.uid = this.user.uid
      this.phoneNumber = this.user.phoneNumber

      console.log(this.uid)
    }


  }
}
