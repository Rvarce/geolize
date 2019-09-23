import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Viaje } from '../interface/viaje';

@Injectable({
  providedIn: 'root'
})
 //validar url api y path
export class ViajeService {
  private api = ""
  constructor(private httpClient: HttpClient) { }

  getAllViajes(){
    const path = `${this.api}/viajes`
    return this.httpClient.get<Viaje>(path)
  }

  getViaje(idViaje: number){
    const path = `${this.api}/viaje/${idViaje}`
    return this.httpClient.get<Viaje>(path)
  }

  getViajeForUser(idUsuario: number){
    const path = `${this.api}/viajeporusuario/${idUsuario}`
    return this.httpClient.get<Viaje>(path)
  }



}
