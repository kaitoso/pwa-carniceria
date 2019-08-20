import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { ProductoService } from '../../services/producto.service';
import { BotonService, Boton } from '../../services/boton.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-lista-productos-cliente',
  templateUrl: './lista-productos-cliente.component.html',
  styleUrls: ['./lista-productos-cliente.component.css']
})
export class ListaProductosClienteComponent implements OnInit {
  valorBoton: any;
  trueFalse;
  
 displayedColumns: string[] = ['nombre', 'cantidad', 'precio'];
 dataSource = new MatTableDataSource();
@ViewChild(MatSort, {static: true}) sort: MatSort;

async ngOnInit() {
   console.log('primer init', this.valorBoton);

  // console.log(this.aux= this.botonService.getBoton());


   this.productoService.getProductos().subscribe(res => this.dataSource.data = res );
   this.valorBoton = await this.botonService.getBotonInit();
   this.trueFalse = this.valorBoton.abierto;
      
 
   

   console.log(this.valorBoton);
   

   

   

 
 }



ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    

      
     
    
 }

 constructor(private productoService: ProductoService, private botonService: BotonService,
             private authService: AuthService, private router: Router) {
              this.botonService.getBoton().subscribe(res => { console.log(res.abierto, 'probando dentro');
                                                              this.trueFalse = res.abierto; } );
              }

 applyFilter(filterValue: string) {
   this.dataSource.filter = filterValue.trim().toLowerCase();
 }



login(){
    this.router.navigate(['/login']);
}
}
