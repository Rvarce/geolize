import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ViajeService } from 'src/app/service/viaje.service';
import { Viaje } from 'src/app/interface/viaje';
import { LugarService } from 'src/app/service/lugar.service';
import { Lugar } from 'src/app/interface/lugar';

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
  idLugares: []
  lugar: Lugar
  lugares: Lugar[] = []
 

  constructor(
    private activeRoute: ActivatedRoute,
    private geolocation: Geolocation,
    private viajeService: ViajeService,
    private lugarService: LugarService
  ) { }

  ngOnInit() {
    this.idItem = this.activeRoute.snapshot.paramMap.get('iditem')
    
    
    let con = this.consultaViaje()
    
    if (con) {
      
      this.loadMap()
    }
    //this.map = new Map('map');
    //this.routingMap()
    console.log('get', this.idItem)
    
    
  }
  

  //Cada viaje tiene varios lugares asociados,
  //Se consulta el viaje del cliente y luegos los lugares asociados al viaje
  consultaViaje(){
    this.viajeService.consultarViaje(this.idItem).subscribe( (data) =>{
      this.idLugares = data.lugares
      console.log(this.idLugares)
      this.consultaLugar(this.idLugares)
       
    })
    
    return true
    
  }

  consultaLugar(idLugar){
    
    idLugar.forEach(element => {
      this.lugarService.consultarLugar(element).subscribe( (data) => {
       // this.lugar = data
        this.lugares.push(data)
                  
      })
    });
    //console.log(this.lugares)
    console.log(this.lugares)
    
    
  }

  loadMap() {
    // this.lat = -33.4469332
    // this.lng = -70.6330825
    
    this.lat = -47.798400
    this.lng = -73.539887

    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentPos = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let latLng = new google.maps.LatLng(this.lat, this.lng);
      let mapOptions = {
        center: latLng,
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }



      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
      
      

      this.lugares.forEach(lugaresData => {
        // console.log(lugaresData.nombre)
        // console.log(lugaresData.lat)
        // console.log(lugaresData.lng)
        let lngLngAux = new google.maps.LatLng(lugaresData.lat, lugaresData.lng)

        var infowindow = new google.maps.InfoWindow;
        infowindow.setContent(lugaresData.nombre);

        var marker = new google.maps.Marker({map: this.map, position: lngLngAux});
        marker.addListener('click', function() {
          infowindow.open(this.map, marker);
        });
      });
        // var marker = new google.maps.Marker({map: this.map, position: latLng});
        // marker.addListener('click', function() {
        //   infowindow.open(this.map, marker);
        // });
        

    })
    
    }
 
  

  /** Remove map when we have multiple map object */
  ionViewWillLeave() {

  }


}
