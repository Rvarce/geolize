import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ViajeService } from 'src/app/service/viaje.service';
import { Viaje } from 'src/app/interface/viaje';
import { LugarService } from 'src/app/service/lugar.service';
import { Rating } from 'src/app/interface/rating';
import { Observable } from 'rxjs';
import { ComentariosService } from '../../service/comentarios.service'
import { Comentarios } from 'src/app/interface/comentarios';
import { AngularFireAuth } from '@angular/fire/auth';
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
  rating: Rating[] = []
  //Para valoracion de usuario
  //Cambios para slides
  slideOpt = {
    initialSlide: 0,
    speed: 400

  }

  fileName: any[] = []
  textarea: string
  file: any[] = []
  newVal: string
  mensajeArchivo = 'No hay un archivo seleccionado'
  //fin modificaciones

  comentarios: Comentarios[] = []


  constructor(
    private activeRoute: ActivatedRoute,
    private geolocation: Geolocation,
    private viajeService: ViajeService,
    private lugarService: LugarService,
    private router: Router,
    private ComentariosService: ComentariosService,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    
    this.idItem = this.activeRoute.snapshot.paramMap.get('iditem')


    this.consultaViaje(this.idItem)//Consulta viaje asociado a usuario
      .then(idLugares => this.loadMap(idLugares))//Carga mapa con los lugares asociados al viaje
      .catch(error => console.log(error))

    this.cargaComentarios()

    this.rating = [

      {
        value: 1,
        icon: "star-outline"
      },
      {
        value: 2,
        icon: "star-outline"
      },
      {
        value: 3,
        icon: "star-outline"
      },
      {
        value: 4,
        icon: "star-outline"
      },
      {
        value: 5,
        icon: "star-outline"
      }
    ]

  }


  //Cada viaje tiene varios lugares asociados,
  //Se consulta el viaje del cliente y luegos los lugares asociados al viaje
  consultaViaje = (idItem) => {
    let idLugares: []
    let promise = new Promise((resolve, rej) => {

      this.viajeService.consultarViaje(idItem).subscribe((data) => {
        idLugares = data.lugares
      //  console.log('Desde consultaViaje ', idLugares)
        resolve(idLugares)

      })
    })
    return promise
  }


  loadMap = (idLugares) => {

    // console.log('idLugares', idLugares)
    // console.log('idLugares 0', idLugares[0])

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
  //Valoracion
  setRating(val) {
    //var ratingAux = this.rating
    for (let i = 0; i < this.rating.length; i++) {
      if (i < val) {
        this.rating[i].icon = 'star'
      } else {
        this.rating[i].icon = 'star-outline'
      }

    }
    this.newVal = val
    //this.router.navigate(['/valoracion', val])

  }
  //Se carga al agregar imagenes desde slide valoracion
  addImage(event) {

    if (event.target.files.length > 0) {
      this.file = event.target.files
      // console.log(file)
      // const reader = new FileReader()
      // reader.onload = e => this.imageSrc = reader.result
      // reader.readAsDataURL(file)

      for (let i = 0; i < event.target.files.length; i++) {

        this.fileName.push(event.target.files[i].name)


      }
      this.mensajeArchivo = `${event.target.files.length} Archivos seleccionados`

    }
  }
  //Sube las imagenes, comentarios y valoracion a Firebase atraves de promesas
  upload = () => {
    this.uploadImage(this.file)
      //.then(file => this.getReference(file))
      .then(imageUrl => this.sendComentario(imageUrl))
      .catch(e => console.error("Error al enviar imagen: ", e))

  }
  //Sube imagenes
  uploadImage = (file) => {
    let image: string[] = []
    let promise = new Promise((resolve, reject) => {
      for (let i = 0; i < file.length; i++) {

        this.ComentariosService.tareaCloudStorage(`carreteraaustral/${file[i].name}`, file[i])
        image.push(`carreteraaustral/${file[i].name}`)
      }
      resolve(image)


    })
    
    return promise
  }
  //Obtiene referencias de las imagenes
  getReference(file) {
    let profileUrl: Observable<string | null>
    let promise = new Promise((resolve, reject) => {
     // console.log(file)
      for (let i = 0; i < file.length; i++) {


        profileUrl = this.ComentariosService.referenciaCloudStorage(`carreteraaustral/${this.file[i].name}`)


      }
    //  console.log(profileUrl)
      resolve(profileUrl)


    })
    return promise
  }
  //Envia comentarios
  sendComentario = (image) => {
    let comentario: Comentarios
    let date: string = new Date().toISOString();
    //let promise = new Promise((resolve, reject) => {
    comentario = {
      fecha: date,
      comentario: this.textarea,
      fotoURL: image,
      valoracion: this.newVal,
      idUsuario: this.afAuth.auth.currentUser.uid
    }

    console.log('sendComentario', comentario)
    this.ComentariosService.guardarComentario(comentario)

    // })


    //return promise
  }
  //Enviaz la valoracion
  subirValoracion(){

  }
  //Carga comentarios anteriores
  cargaComentarios() {
    this.ComentariosService.consultaComentarios().subscribe( data => {
      this.comentarios = data
      console.log('cargaComentarios', this.comentarios)
    } )

  }

}
