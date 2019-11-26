import { Component, OnInit, OnDestroy } from '@angular/core';
import { BotonClienteService, Boton } from '../../services/boton-cliente.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit, OnDestroy {
  valorBoton;
  trueFalse: boolean;
  estadoBoton: any;

  constructor(private botonService: BotonClienteService,
              private authService: AuthService, private router: Router) { 
                this.estadoBoton =  this.botonService.getBoton().subscribe(res => { this.trueFalse = res.abierto; } );
              }
  
  
  async ngOnInit() {
    this.valorBoton = await this.botonService.getBotonInit().subscribe(res => {this.trueFalse = res.abierto;});
  }

  ngOnDestroy(){
    
    this.estadoBoton.unsubscribe();
    this.valorBoton.unsubscribe();
   
   }

   login(){
    this.router.navigate(['/admin/lista-productos']);
}
}
