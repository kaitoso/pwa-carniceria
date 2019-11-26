import { Injectable } from '@angular/core';

import {auth} from 'firebase/app'
import {AngularFireAuth} from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import {switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import { reject } from 'q';
import { AngularFireModule } from '@angular/fire';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;
  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) { }

  loginUser( email: string, pass: string){
  return new Promise((resolve, reject) => {
    this.afAuth.auth.signInWithEmailAndPassword(email, pass)
    .then(userData => resolve(userData),
    err => reject(err));
  });
  
   /* this.afAuth.auth.signInWithEmailAndPassword(email, pass)
      .catch(error => {
        this.eventAuthError.next(error);
      })
      .then(userCredential => {
        if(userCredential) {
          this.router.navigate(['/admin/lista-productos']);
        }
      });*/
  }

  

  logoutUSer(){
    return this.afAuth.auth.signOut();
  }

}
