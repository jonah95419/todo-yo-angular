import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './servicios/service/usuarios.service';
import { CotizacionService } from './servicios/service/cotizacion.service';
import { ServiciosAlbanieleriaService } from './servicios/service/servicios_albanieleria.service';
import { CotizacionDetallesService } from './servicios/service/cotizacion_detalles.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo-yo';

  constructor(
    private serviciosAlbanieleriaApi: ServiciosAlbanieleriaService,
    private cotizacionApi: CotizacionService,
    private usuariosApi: UsuariosService,
    private detallesCotizacionApi: CotizacionDetallesService
  ){
    serviciosAlbanieleriaApi.cargarTodo();
    cotizacionApi.cargarTodo();
    usuariosApi.cargarTodo();
    detallesCotizacionApi.cargarTodo();
  }

}
