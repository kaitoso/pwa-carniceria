import { Component, OnInit, Inject, ViewChild,AfterViewInit,OnDestroy } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { ProductoService } from '../../services/producto.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormularioComponent } from '../formulario/formulario.component';
import { BotonService, Boton } from '../../services/boton.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';  
import { element } from 'protractor';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';





@Component({
  selector: 'lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(public formbuild: FormBuilder,public productoService: ProductoService, private botonService: BotonService,
              public dialog: MatDialog, private authService: AuthService, private router: Router) {

                this.listadoProductos = this.productoService.getProductos().subscribe(res => this.dataSource.data = res );
               
                this.estadoBoton = this.botonService.getBoton().subscribe(res => { this.trueFalse = res.abierto; } );
               
              
              
              
              }
   valorBoton;
   valorBotonCambiar;
   trueFalse;
   listadoProductos;
   estadoBoton;
   gatillador = false;
   panelOpenState = false;
   productoDescontarCant;
   arregloProductos = [];
   productotemporal;
   totalprod;
   total = 0;
   recontarcantidad;
   cantidadNueva: number;
   cantidadVieja: number;
   cantidadmedia: number;
  displayedColumns: string[] = ['nombre', 'cantidad', 'precio', 'acciones'];
  dataSource = new MatTableDataSource();
 @ViewChild(MatSort, {static: true}) sort: MatSort;

    myForm = new FormGroup({
      canti: new FormControl(''),
      produ: new FormControl({disabled: true})

    });

    
 async ngOnInit() {

  this.myForm.reset({
    produ: {value: '', disabled: true},
    canti: ''
  });
   

    
    this.valorBoton = this.botonService.getBotonInit().subscribe(res => {this.trueFalse = res.abierto;
    });
  }


 ngAfterViewInit() {

     this.dataSource.sort = this.sort;

  }

  ngOnDestroy(){
    this.listadoProductos.unsubscribe();
    this.estadoBoton.unsubscribe();
    this.valorBoton.unsubscribe();
    if(this.gatillador){
      this.valorBotonCambiar.unsubscribe();
    }
    
    
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 

  agrega(element){
     
    this.productoService.seleccion = element;
    this.myForm.reset({
      produ: {value: element.nombre, disabled: true},
      canti: ''
    });

  }
  descuenta(){
   const patron = /^\d*$/;
   this.productoDescontarCant = this.myForm.value.canti;
      
   this.cantidadNueva = Number( this.productoService.seleccion.cantidad - this.myForm.value.canti);
   
       
   this.cantidadVieja  = Number(this.productoService.seleccion.cantidad);
     
    
   if(this.productoDescontarCant > this.cantidadVieja || this.cantidadVieja == 0){
        alert('No hay stock suficiente');
    } else if(this.productoDescontarCant == 0){
      alert('Debe ingresar una cantidad mayor a cero');
    } else{
        this.productotemporal = this.productoService.seleccion;
        
        this.productoService.seleccion.cantidad = this.cantidadNueva;
       
        this.productoService.editaProductos(this.productoService.seleccion);
        
        this.productotemporal.cantidad = this.productoDescontarCant;
        this.arregloProductos.push(this.productotemporal);
                
        this.totalprod = this.productotemporal.cantidad * this.productotemporal.precio;
        this.total = Number(this.totalprod) + Number(this.total);
       
        
        
        
       
        
        
        
        this.myForm.reset({
          produ: {value: '', disabled: true},
          canti: ''
        });
    }
    
  }
  eliminaDescuento(producto){

         let index = this.arregloProductos.indexOf(producto);
         this.totalprod = this.arregloProductos[index].cantidad * this.arregloProductos[index].precio;
         this.total = this.total - this.totalprod;
         
         
         
         this.recontarcantidad = Number(this.arregloProductos[index].cantidad) + Number(this.cantidadNueva);
        
         this.productoService.seleccion.cantidad = this.recontarcantidad;
         
         this.productoService.editaProductos(this.productoService.seleccion);
         if (index > -1) { this.arregloProductos.splice(index, 1) }
         
         

  }

  onEdit(element) {
    this.cleanForm();
    this.abreModal();
    if (element) {
      this.productoService.seleccion = element;
    }
  }

  onAdd() {
    this.cleanForm();
    this.abreModal();

  }

  onDelete(id: string) {
    const val = confirm('¿Está seguro que desea eliminar este producto?');
    if (val) {
    this.productoService.eliminaProductos(id);
    }
  }

  abreModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Modal'
    };
    dialogConfig.autoFocus = true;
    this.dialog.open(FormularioComponent, dialogConfig);
  }

  cleanForm(): void {
    this.productoService.seleccion.nombre = '';
    this.productoService.seleccion.cantidad = 0;
    this.productoService.seleccion.precio = 0;
    this.productoService.seleccion.id = null;

  }



  pruebaBoton() {
   this.valorBotonCambiar = this.botonService.getBoton().subscribe(res => { this.trueFalse = res.abierto ; this.gatillador = true;});
   this.botonService.cambiaBoton(this.trueFalse);

  }

 logout() {
    this.authService.logoutUSer().then((res) => this.router.navigateByUrl('/') );
 }

 horarios(){
  this.router.navigate(['/horarios']);

 }

 imprimePDF(){
   

   const doc = jsPDF('p', 'pt', 'a4');
   doc.fromHTML(document.getElementById('descuento') , 50, 10);
   doc.save('comprobante');
   this.arregloProductos = [];
   this.total = 0;
   this.totalprod = 0;
 }

}
