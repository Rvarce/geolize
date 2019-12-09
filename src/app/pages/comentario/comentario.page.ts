import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComentariosService } from 'src/app/service/comentarios.service';
import { Comentarios } from '../../interface/comentarios';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.page.html',
  styleUrls: ['./comentario.page.scss'],
})
export class ComentarioPage implements OnInit {
  id: string
  comentario: Comentarios= {
    id: '',
    fecha: '',
    comentario: '',
    fotoURL: [],
    valoracion: '',
    idUsuario: '',
    nombreUsuario: ''
  }
  imagenes: any[] = []
  slideOpt = {
    initialSlide: 0,
    speed: 400

  }
  constructor(
    private activeRoute: ActivatedRoute,
    private comentariosService: ComentariosService
  ) { }

  ngOnInit() {
    this.id = this.activeRoute.snapshot.paramMap.get('id')
    console.log(this.id)
    this.consultaComentario(this.id)
      .then(imageUrl => this.descargaImagenes(imageUrl))
      .catch(err => console.error('error al cargar comentario', err))

      let date: string = this.comentario.fecha
      
  }

  consultaComentario(id) {
    let imageUrl: string[]
    let promise = new Promise((resolve, reject) => {
      this.comentariosService.consultaComentario(id).subscribe(data => {
        this.comentario = data
        imageUrl = data.fotoURL
        let date = new Date(this.comentario.fecha)
        console.log('fecha', date.toLocaleDateString())
        resolve(imageUrl)
      })
    })
    return promise
  }

  descargaImagenes(imageUrl) {
    let promise = new Promise((resolve, reject) => {

      imageUrl.forEach(element => {
        this.comentariosService.referenciaCloudStorage(element).subscribe(data => {
          this.imagenes.push(data)
         // console.log(this.imagenes)
        })
      });

    })
    return promise
  }


}
