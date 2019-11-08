import { Injectable } from '@angular/core';
import { Lugar } from '../interface/lugar';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LugarService {
  private lugarCollection: AngularFirestoreCollection<Lugar>
  private lugar: Observable<Lugar[]>

  constructor(private db: AngularFirestore) { 
    this.lugarCollection = this.db.collection<Lugar>('lugar')

    this.lugar = this.lugarCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    )
  }

  consultarLugar(idLugar){
    return this.lugarCollection.doc<Lugar>(idLugar).valueChanges()
  }



}
