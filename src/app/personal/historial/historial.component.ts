import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { CotizacionDetallesService } from '../../servicios/service/cotizacion_detalles.service';
import { CotizacionService } from '../../servicios/service/cotizacion.service';
import { map, tap } from 'rxjs/operators';
import { ObtenerInteracciones  } from '../../utils/obtenerHistorial';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'personal-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit, OnDestroy {

  historial$: Observable<any[]>;
  locale: string;

  private _translate;

  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private cotizacionApi: CotizacionService,
    private cotizacionDetalleApi: CotizacionDetallesService) {
    route.queryParams.subscribe(
      (params: Params) => {
        const id = params.id;
        if(id) { this.obtenerInformacion(id); }
      });
      translate.setDefaultLang('es');
      translate.use('es');
   }

  ngOnInit(): void {
    this.locale = this.translate.currentLang;
    this._translate =  this.translate.onLangChange
    .subscribe((langChangeEvent: LangChangeEvent) => {this.locale = langChangeEvent.lang;})
  }

  ngOnDestroy(): void {
    if(this._translate !== undefined) {
      this._translate.unsubscribe();
    }
  }

  private obtenerInformacion = (id: string): void => {
    this.historial$ = combineLatest(
      [this.cotizacionApi.todos,
      this.cotizacionDetalleApi.todos])
    .pipe(
      map( data => new ObtenerInteracciones(id, data[0], data[1]).combinarTablas())
    );
  }

}
