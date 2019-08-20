import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Boton } from '../models/abierto_cerrado.interface';

export interface Boton {abierto: boolean; }


@Injectable({
  providedIn: 'root'
})
export class BotonService {


  private abiertoCerradoCollection: AngularFirestoreDocument<Boton>;
 public boton: Observable<Boton>;
 public botonInit;
 public botoncito: Boton;

  constructor(private afs: AngularFirestore) {

    this.abiertoCerradoCollection = afs.doc<Boton>('abierto-cerrado/boton');
    this.boton = this.abiertoCerradoCollection.valueChanges();
   }

    getBoton() {
     return this.boton;
    }

    async getBotonInit() {

      return this.botonInit = await new Promise<Boton>(resolve => this.boton
        .subscribe(res => { console.log(res.abierto, 'probando');
         resolve(res); } ));


   }


  cambiaBoton(prueba) {

      const aux2: Boton = {
        abierto: prueba
      };
      const aux3 = aux2;
      if (aux2.abierto === true) {
        aux3.abierto = false;
        return this.abiertoCerradoCollection.update(aux3);
     } else {
      aux3.abierto = true;
      return this.abiertoCerradoCollection.update(aux3);
     }
   }
}
