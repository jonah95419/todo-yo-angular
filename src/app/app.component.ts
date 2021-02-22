import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './usuarios/service/usuarios.service';
import { CotizacionService } from './servicios/service/cotizacion.service';
import { Servicio1Service } from './servicios/service/servicios1.service';
import { PromocionesService } from './promociones/service/promociones.service';
import { Servicio7Service } from './servicios/service/servicios7.service';
import { AuthenticationService } from './registro/service/authentication.service';
import { Servicio2Service } from './servicios/service/servicios2.service';
import { Servicio3Service } from './servicios/service/servicios3.service';
import { Servicio4Service } from './servicios/service/servicios4.service';
import { Servicio5Service } from './servicios/service/servicios5.service';
import { Servicio6Service } from './servicios/service/servicios6.service';
import { CotizacionDetallesService } from './servicios/service/cotizacion_detalles.service';
import { PersonalService } from './personal/service/personal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Todo-YO';

  constructor(
    private servicios1Api: Servicio1Service,
    private servicios2Api: Servicio2Service,
    private servicios3Api: Servicio3Service,
    private servicios4Api: Servicio4Service,
    private servicios5Api: Servicio5Service,
    private servicios6Api: Servicio6Service,
    private servicios7Api: Servicio7Service,
    private cotizacionApi: CotizacionService,
    private usuariosApi: UsuariosService,
    private detallesCotizacionApi: CotizacionDetallesService,
    private personalApi: PersonalService,
    private promocionesApi: PromocionesService,
    public authenticationService: AuthenticationService
  ){
    servicios1Api.cargarTodo();
    servicios2Api.cargarTodo();
    servicios3Api.cargarTodo();
    servicios4Api.cargarTodo();
    servicios5Api.cargarTodo();
    servicios6Api.cargarTodo();
    servicios7Api.cargarTodo();
    cotizacionApi.cargarTodo();
    usuariosApi.cargarTodo();
    detallesCotizacionApi.cargarTodo();
    personalApi.cargarTodo();
    promocionesApi.cargarTodo();

  }

}
