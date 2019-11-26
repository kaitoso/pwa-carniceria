import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { ListaProductosClienteComponent } from './components/lista-productos-cliente/lista-productos-cliente.component';
import { AuthGuard } from './guards/auth.guard';
import { HorariosComponent } from './components/horarios/horarios.component';




const routes: Routes = [
  {path: '', component: ListaProductosClienteComponent },
  {path: 'horarios', component: HorariosComponent},
  {path: 'login', component: LoginComponent },
  {path: 'admin/lista-productos', component: ListaProductosComponent, canActivate:[AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
