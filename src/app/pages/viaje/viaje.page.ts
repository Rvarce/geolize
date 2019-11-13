import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ViajeService } from 'src/app/service/viaje.service';
import { Viaje } from 'src/app/interface/viaje';
import { LugarService } from 'src/app/service/lugar.service';

declare var google;

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {
  userId: string
  currentPos: number
  lat: number
  lng: number
  idItem: string
  viaje: Viaje
  map: any

  constructor(
    private activeRoute: ActivatedRoute,
    private geolocation: Geolocation,
    private viajeService: ViajeService,
    private lugarService: LugarService
  ) { }

  ngOnInit() {
    this.idItem = this.activeRoute.snapshot.paramMap.get('iditem')


    this.consultaViaje(this.idItem)//Consulta viaje asociado a usuario
      .then(idLugares => this.loadMap(idLugares))//Carga mapa con los lugares asociados al viaje
      .catch(error => console.log(error))

    console.log('get', this.idItem)

  }


  //Cada viaje tiene varios lugares asociados,
  //Se consulta el viaje del cliente y luegos los lugares asociados al viaje
  consultaViaje = (idItem) => {
    let idLugares: []
    let promise = new Promise((resolve, rej) => {

      this.viajeService.consultarViaje(idItem).subscribe((data) => {
        idLugares = data.lugares
        console.log('Desde consultaViaje ', idLugares)
        resolve(idLugares)

      })
    })
    return promise
  }


  loadMap = (idLugares) => {

    console.log('idLugares', idLugares)
    console.log('idLugares 0', idLugares[0])

    this.lugarService.consultarLugar(idLugares[0]).subscribe((data) => {
      let latLng = new google.maps.LatLng(data.lat, data.lng);
      let mapOptions = {
        center: latLng,
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    })

    //Busca cada lugar correspondiente al viaje e inserta un marker en el mapa
    idLugares.forEach(element => {

      this.lugarService.consultarLugar(element).subscribe((data) => {

        let latLngAux = new google.maps.LatLng(data.lat, data.lng)
        var infowindow = new google.maps.InfoWindow;
        infowindow.setContent(data.nombre);
        var marker = new google.maps.Marker({ map: this.map, position: latLngAux });
        marker.addListener('click', function () {
          infowindow.open(this.map, marker);
        });
      })
    });

  }

  myPosition() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentPos = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: this.currentPos,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

      var marker = new google.maps.Marker({ 
        map: this.map, 
        position: this.currentPos,
        draggable: true,
        animation: google.maps.Animation.BOUNCE
      });
      
    })
  }


}
