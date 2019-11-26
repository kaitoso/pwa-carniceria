import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MaterialModule } from './material/material.module';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { FormularioComponent } from './components/formulario/formulario.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { LoginComponent } from './components/login/login.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { ListaProductosClienteComponent } from './components/lista-productos-cliente/lista-productos-cliente.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { HorariosComponent } from './components/horarios/horarios.component';


const firebaseConfig =  {
  apiKey: 'AIzaSyD65OWT3p_SEseHU-1ifhJUqhpDB1OAclU',
  authDomain: 'prueba-crud-bc89e.firebaseapp.com',
  databaseURL: 'https://prueba-crud-bc89e.firebaseio.com',
  projectId: 'prueba-crud-bc89e',
  storageBucket: 'prueba-crud-bc89e.appspot.com',
  messagingSenderId: '124188384930',
  appId: '1:124188384930:web:a34f8efe997414ab' };

@NgModule({
  declarations: [
    AppComponent,
    ListaProductosComponent,
    FormularioComponent,
    ToolbarComponent,
    LoginComponent,
    ListaProductosClienteComponent,
    HorariosComponent
  ],
  imports: [
    
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AngularFireAuth, AuthService, AuthGuard, AngularFireModule],
  bootstrap: [AppComponent],
  entryComponents: [FormularioComponent]
})
export class AppModule { }
