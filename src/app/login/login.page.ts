import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string
  pass: string
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  authUsuario(){
    
    this.authService.login(this.email, this.pass)

  }
}
