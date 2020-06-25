import { Component, OnInit } from '@angular/core';
import { ServiciosAlbanieleriaService } from '../service/servicios_albanieleria.service';
import { CotizacionService } from '../service/cotizacion.service';
import { Observable, combineLatest } from 'rxjs';
import { UsuariosService } from '../service/usuarios.service';
import { map } from 'rxjs/operators';
import { combinarTablas } from '../../utils/obtenerCotizacion';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-albanieleria',
  templateUrl: './albanieleria.component.html',
  styleUrls: ['./albanieleria.component.css']
})
export class AlbanieleriaComponent implements OnInit {

  cotizaciones$: Observable<any[]>

  locale: string;
  private _translate;

  constructor(
    private translate: TranslateService,
    private serviciosAlbanieleriaApi: ServiciosAlbanieleriaService,
    private cotizacionApi: CotizacionService,
    private usuariosApi: UsuariosService) {
      translate.setDefaultLang('es');
      translate.use('es');
    }

  ngOnInit(): void {
    this.locale = this.translate.currentLang;
    this._translate =  this.translate.onLangChange
    .subscribe((langChangeEvent: LangChangeEvent) => {this.locale = langChangeEvent.lang;})

    this.obtenerCotizaciones();
  }

  private obtenerCotizaciones = (): void => {
    this.cotizaciones$ = combineLatest(
      this.serviciosAlbanieleriaApi.todos,
      this.cotizacionApi.todos,
      this.usuariosApi.todos)
    .pipe(
      map( data => combinarTablas(data[0], data[1], data[2])),
    );
  }

}
