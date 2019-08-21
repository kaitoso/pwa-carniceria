import { Component, OnInit, ViewChild,AfterViewInit,OnDestroy } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { ProductoService } from '../../services/producto.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormularioComponent } from '../formulario/formulario.component';
import { BotonService, Boton } from '../../services/boton.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';





@Component({
  selector: 'lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit, AfterViewInit, OnDestroy {
   valorBoton;
   valorBotonCambiar;
   trueFalse;
   listadoProductos;
   estadoBoton;
   gatillador = false;

  displayedColumns: string[] = ['nombre', 'cantidad', 'precio', 'acciones'];
  dataSource = new MatTableDataSource();
 @ViewChild(MatSort, {static: true}) sort: MatSort;

 async ngOnInit() {
    console.log('primer init', this.valorBoton);

    
    this.valorBoton = this.botonService.getBotonInit().subscribe(res => {this.trueFalse = res.abierto; console.log('aers');
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

  constructor(private productoService: ProductoService, private botonService: BotonService,
              public dialog: MatDialog, private authService: AuthService, private router: Router) {

                this.listadoProductos = this.productoService.getProductos().subscribe(res => this.dataSource.data = res );
               
                this.estadoBoton = this.botonService.getBoton().subscribe(res => { this.trueFalse = res.abierto; } );
               }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

}
