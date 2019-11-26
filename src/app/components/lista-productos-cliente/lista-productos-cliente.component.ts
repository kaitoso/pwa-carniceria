import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { ProductoService } from '../../services/producto.service';
import { BotonClienteService, Boton } from '../../services/boton-cliente.service';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ProductoCliService } from '../../services/producto-cli.service';



@Component({
  selector: 'app-lista-productos-cliente',
  templateUrl: './lista-productos-cliente.component.html',
  styleUrls: ['./lista-productos-cliente.component.css']
})
export class ListaProductosClienteComponent implements OnInit, AfterViewInit, OnDestroy {
  valorBoton;
  trueFalse;
  listaProductos;
  estadoBoton;
  
 displayedColumns: string[] = ['nombre', 'cantidad', 'precio'];
 dataSource = new MatTableDataSource();
@ViewChild(MatSort, {static: true}) sort: MatSort;

async ngOnInit() {
   
  // console.log(this.aux= this.botonService.getBoton());


  
   
   this.valorBoton = await this.botonService.getBotonInit().subscribe(res => {this.trueFalse = res.abierto;});
  // this.trueFalse = this.valorBoton.abierto;

 }

 ngOnDestroy(){
  this.listaProductos.unsubscribe();
  this.estadoBoton.unsubscribe();
  this.valorBoton.unsubscribe();
 
 }



ngAfterViewInit() {
 

    this.dataSource.sort = this.sort;
    

    
      
     
    
 }

 constructor(private productoCliService: ProductoCliService, private botonService: BotonClienteService,
             private authService: AuthService, private router: Router) {

        
              
        this.listaProductos =  this.productoCliService.getProductos().subscribe(res => {this.dataSource.data = res; });

        this.estadoBoton =  this.botonService.getBoton().subscribe(res => { this.trueFalse = res.abierto; } );
              }

 applyFilter(filterValue: string) {
   this.dataSource.filter = filterValue.trim().toLowerCase();
 }



login(){
    this.router.navigate(['/admin/lista-productos']);
}

horarios(){
  this.router.navigate(['/horarios']);

 }
}
