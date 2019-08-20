import { Component, OnInit } from '@angular/core';
import { SwUpdate} from '@angular/service-worker';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pwa-carniceria';




constructor(private swUpdate: SwUpdate)  {

}

ngOnInit() {
 this.recargacache();
}

recargacache( ) {
  if (this.swUpdate.isEnabled) {
    this.swUpdate.available.subscribe( () => {
      if (confirm('Hay una nueva version disponible ¿Desea actualizar?')) {
               window.location.reload();
      }
    });
  }
}
}