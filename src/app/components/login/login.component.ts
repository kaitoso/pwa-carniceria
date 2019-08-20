import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private email: string = '';
  private pass: string = '';
  public error: boolean = false;
  public errorTipo: string[]= ['Debe ingresar un email valido','El correo ingresado no esta registrado',' La contraseña no es correcta'];
  public errorNumero: number;
  constructor(private afAuth: AngularFireAuth, private router: Router, private authservice: AuthService) { }

  ngOnInit() {
  }

  onLogin(): void{
    console.log("al principio vale", this.error);
    
    this.authservice.loginUser(this.email, this.pass)
    .then((res) => {
      this.router.navigate(['/admin/lista-productos']);
    }).catch(err => {this.error = true;
                     if(err.message === 'The email address is badly formatted.') {
          this.errorNumero = 0;
        } else if (err.message === 'There is no user record corresponding to this identifier. The user may have been deleted.'){
           this.errorNumero = 1;
        } else if (err.message === 'The password is invalid or the user does not have a password.') {
           this.errorNumero = 2;
        }
                     console.log('err', err.message);
      });
    console.log(this.email, this.pass);
    console.log("luego vale", this.error);

  }

}
