import { Injectable } from '@angular/core';
import { Viaje } from '../interface/viaje';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
 
export class ViajeService {
  private viajeCollection: AngularFirestoreCollection<Viaje>
  private viaje: Observable<Viaje[]>
  
  constructor(private db: AngularFirestore){ 
    this.viajeCollection = this.db.collection<Viaje>('viaje')
    
    this.viaje = this.viajeCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    )
  }

  consultarViajes(){
    return this.viaje
  }
  consultarViaje(id){
    return this.viajeCollection.doc<Viaje>(id).valueChanges()
    
  }
  updateViaje(){
    
  }

}
