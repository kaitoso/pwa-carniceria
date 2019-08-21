import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Boton } from '../models/abierto_cerrado.interface';

export interface Boton {abierto: boolean; }


@Injectable({
  providedIn: 'root'
})
export class BotonClienteService {


  private abiertoCerradoCollection: AngularFirestoreDocument<Boton>;
 public boton: Observable<Boton>;
 public botonInit;


  constructor(private afs: AngularFirestore) {

    this.abiertoCerradoCollection = afs.doc<Boton>('abierto-cerrado/boton');
    this.boton = this.abiertoCerradoCollection.valueChanges();
   }

    getBoton() {
     return this.boton;
    }

    getBotonInit() {

      return this.boton; //(resolve => this.boton
       /* .subscribe(res => { console.log(res.abierto, 'probando');
                            resolve(res); } ));*/


   }


  
}
