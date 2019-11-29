import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { map } from 'rxjs/operators';
import { Usuario } from '../interface/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarioCollection: AngularFirestoreCollection<Usuario>
  private usuario: Observable<Usuario[]>

  constructor(private db: AngularFirestore) {
    this.usuarioCollection = this.db.collection<Usuario>('usuario')

    this.usuario = this.usuarioCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    )

   }
   consultarUsuario(id){
    return this.usuarioCollection.doc<Usuario>(id).valueChanges()
    
  }
}
