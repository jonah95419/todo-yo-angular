import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { CotizacionDetallesService } from '../../servicios/service/cotizacion_detalles.service';
import { CotizacionService } from '../../servicios/service/cotizacion.service';
import { map, tap } from 'rxjs/operators';
import { combinarTablasHistorial } from '../../utils/obtenerHistorial';

@Component({
  selector: 'personal-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  historial$: Observable<any[]>;

  constructor(
    private route: ActivatedRoute,
    private cotizacionApi: CotizacionService,
    private cotizacionDetalleApi: CotizacionDetallesService) {
    route.queryParams.subscribe(
      (params: Params) => {
        const id = params.id;
        if(id) { this.obtenerInformacion(id); }
      });
   }

  ngOnInit(): void {
  }

  private obtenerInformacion = (id: string): void => {
    this.historial$ = combineLatest(
      this.cotizacionApi.todos,
      this.cotizacionDetalleApi.todos)
    .pipe(
      map( data => combinarTablasHistorial(id, data[0], data[1])),
    );
  }

}
