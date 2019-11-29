import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Comentarios } from '../interface/Comentarios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  private comentarioCollection: AngularFirestoreCollection<Comentarios>
  private comentario: Observable<Comentarios[]>

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) {
    this.comentarioCollection = this.db.collection<Comentarios>('comentario')

    this.comentario = this.comentarioCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    )
  }
  //Tarea para subir archivo
  tareaCloudStorage(nombreArchivo: string, datos: any) {
   // return this.storage.upload(nombreArchivo, datos);
   let ref = this.storage.ref(nombreArchivo)
   const task = ref.put(datos)
   
  }

  //Referencia del archivo
  referenciaCloudStorage(nombreArchivo: string) {
    let profileUrl: Observable<string | null>
    let ref = this.storage.ref(nombreArchivo)
    return profileUrl = ref.getDownloadURL()
    
  }
  consultaComentarios(){
    return this.comentario
  }

  consultaComentario(idcomentario) {
    return this.comentarioCollection.doc<Comentarios>(idcomentario).valueChanges()
  }

  guardarComentario(comentario: Comentarios) {
    let docRef = this.db.collection("comentario").add({
      fecha: comentario.fecha,
      comentario: comentario.comentario,
      valoracion: comentario.valoracion,
      fotoURL: comentario.fotoURL,
      idUsuario: comentario.idUsuario
    })
      .then( docRef => {
        console.log("Documento subido con ID: ", docRef.id);
      })
      .catch (error => {
        console.error("Error agregando el documento: ", error);
      });
  }


}
