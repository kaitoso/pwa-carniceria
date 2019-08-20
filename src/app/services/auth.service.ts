import { Injectable } from '@angular/core';

import {auth} from 'firebase/app'
import {AngularFireAuth} from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import {switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import { reject } from 'q';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;

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
  }

  logoutUSer(){
    return this.afAuth.auth.signOut();
  }

}
