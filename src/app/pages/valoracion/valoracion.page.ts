import { Component, OnInit } from '@angular/core';
import { Rating } from 'src/app/interface/rating';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { element } from 'protractor';
import { timingSafeEqual } from 'crypto';
import { ComentariosService } from '../../service/comentarios.service'
import { reject } from 'q';
import { resolve } from 'url';
import { Comentarios } from 'src/app/interface/Comentarios';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-valoracion',
  templateUrl: './valoracion.page.html',
  styleUrls: ['./valoracion.page.scss'],
})
export class ValoracionPage implements OnInit {


  profileUrl: Observable<string | null>
  
  file: any
  newVal: string

  fileName: any[] = []
  datosFormulario = new FormData()

  textarea: string
  
  mensajeArchivo = 'No hay un archivo seleccionado'
  imageSrc: any
  
  

  slideOpt = {
    initialSlide: 0,
    speed: 400

  }
  rating: Rating[] = []
  val: any
  
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute, 
    public navCtrl: NavController,
    private ComentariosService: ComentariosService
    ) { }

  ngOnInit() {

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

    this.val = this.activeRoute.snapshot.paramMap.get('val')
    this.setRating(this.val)
  }


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
  upload = () => {
    this.uploadImage()
        .then(imageUrl => this.sendComentario(imageUrl))
        .then( () => {
          this.router.navigate(['/viaje'])
        })
        .catch(e => console.error("Error al enviar imagen: ", e))
   
  }

  uploadImage = ()=>{
  
    let promise = new Promise((resolve, reject)=>{
      for (let i = 0; i < this.file.length; i++) {

        this.ComentariosService.tareaCloudStorage(`carreteraaustral/${this.file[i].name}`, this.file[i])
        this.profileUrl = this.ComentariosService.referenciaCloudStorage(`carreteraaustral/${this.file[i].name}`)
        
      
      }
      resolve(this.profileUrl)
      
      
    })
    return promise
  }

  sendComentario = (imageUrl) => {
    let comentario: Comentarios
    let date: string = new Date().toISOString();
    //let promise = new Promise((resolve, reject) => {
    
      // comentario.fecha = 'date'
      // comentario.comentario = this.textarea
      // comentario.fotoURL = imageUrl
      // comentario.valoracion = this.newVal

      //console.log(imageUrl[0])

   // })
    

    //return promise
  }

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
  }


}
