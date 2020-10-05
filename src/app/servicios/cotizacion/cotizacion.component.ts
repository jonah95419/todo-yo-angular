import { Component, OnInit, OnDestroy, Inject, ViewChild, ElementRef } from '@angular/core';
import { Servicio1Service } from '../service/servicios1.service';
import { CotizacionService } from '../service/cotizacion.service';
import { Observable, combineLatest } from 'rxjs';
import { UsuariosService } from '../../usuarios/service/usuarios.service';
import { map, tap } from 'rxjs/operators';
import { ObtenerCotizacion } from '../../utils/obtenerCotizacion';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Servicio2Service } from '../service/servicios2.service';
import { Servicio3Service } from '../service/servicios3.service';
import { Servicio4Service } from '../service/servicios4.service';
import { Servicio5Service } from '../service/servicios5.service';
import { Servicio6Service } from '../service/servicios6.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Servicio7Service } from '../service/servicios7.service';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css'],
  providers: [
  ],
})
export class CotizacionComponent implements OnInit, OnDestroy {

  @ViewChild('filterIcon') filterIcon: ElementRef;

  cotizaciones$: Observable<any[]>

  filtro_fecha: Date;
  filtro_pendiente: boolean;
  filtro_cerrado: boolean;

  locale: string;
  tipo: string;
  tipos: string[] = ['albañileria', 'electricidad', 'gypsuma', 'mecanicai', 'seguridade','plomeria', 'alquiler'];

  private _translate;

  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService,
    private servicio1Api: Servicio1Service,
    private servicio2Api: Servicio2Service,
    private servicio3Api: Servicio3Service,
    private servicio4Api: Servicio4Service,
    private servicio5Api: Servicio5Service,
    private servicio6Api: Servicio6Service,
    private servicio7Api: Servicio7Service,
    private cotizacionApi: CotizacionService,
    private usuariosApi: UsuariosService,
    public dialog: MatDialog) {
      this.filtro_cerrado = true;
      this.filtro_pendiente = true;
      this.filtro_fecha = new Date();
      translate.setDefaultLang('es');
      translate.use('es');
      route.params.subscribe(
        (params: Params) => {
          this.tipo = params.tipo;
          if(this.tipo) { this.establecerServicio(); }
        });
    }

  ngOnInit(): void {
    this.locale = this.translate.currentLang;
    this._translate = this.translate.onLangChange
    .subscribe((langChangeEvent: LangChangeEvent) => {this.locale = langChangeEvent.lang;})
  }

  ngOnDestroy(): void {
    if(this._translate !== undefined) {
      this._translate.unsubscribe();
    }
  }

  openDialog() {
    const top = this.filterIcon.nativeElement.getBoundingClientRect().bottom;
    const left = this.filterIcon.nativeElement.getBoundingClientRect().right;
    this.dialog.open(DialogDataExampleDialog, {
      data: {
        fecha: this.filtro_fecha,
        pendiente: this.filtro_pendiente,
        cerrado: this.filtro_cerrado,
        top,
        left
      },
        width: '280px',
        hasBackdrop: true,
        panelClass: 'filter-popup'
    }).afterClosed().subscribe( data => {
      if(data !== undefined) {
        this.filtro_cerrado = data.cerrado;
        this.filtro_pendiente = data.pendiente;
        this.filtro_fecha = new Date(data.fecha);
        this.establecerServicio();
      }
    })
  }

  private establecerServicio = () => {
    this.cotizaciones$ = null;
    if(this.tipos.find(t => t === this.tipo) !== undefined) {
      if(this.tipo === this.tipos[0]) {
        this.obtenerCotizaciones(this.servicio1Api.todos);
      }
      if(this.tipo === this.tipos[1]) {
        this.obtenerCotizaciones(this.servicio2Api.todos);
      }
      if(this.tipo === this.tipos[2]) {
        this.obtenerCotizaciones(this.servicio3Api.todos);
      }
      if(this.tipo === this.tipos[3]) {
        this.obtenerCotizaciones(this.servicio4Api.todos);
      }
      if(this.tipo === this.tipos[4]) {
        this.obtenerCotizaciones(this.servicio5Api.todos);
      }
      if(this.tipo === this.tipos[5]) {
        this.obtenerCotizaciones(this.servicio6Api.todos);
      }
      if(this.tipo === this.tipos[6]) {
        this.obtenerCotizaciones(this.servicio7Api.todos);
      }
    }
  }

  private obtenerCotizaciones = (o:Observable<any[]>): void => {
    this.cotizaciones$ = combineLatest([
      o,
      this.cotizacionApi.todos,
      this.usuariosApi.todos
    ]).pipe(
      map( data => new ObtenerCotizacion(data[0], data[1], data[2]).combinarTablas()),
      map( data => this.aplicarFiltros(data) )
    );
  }

  private aplicarFiltros = (c) => {
    //console.log(c);
    if(this.filtro_pendiente && this.filtro_cerrado) {
      return c.filter( d =>
        this.compararFechas(d.cotizacion.fecha, this.filtro_fecha)
      )
    } else {
      if (this.filtro_pendiente) {
        return c.filter( d =>
          d.cotizacion.estado &&
          this.compararFechas(d.cotizacion.fecha, this.filtro_fecha)
        )
      } else {
        return c.filter( d =>
          !d.cotizacion.estado &&
          this.compararFechas(d.cotizacion.fecha, this.filtro_fecha)
        )
      }
    }
  }

  private compararFechas = (fecha1, fecha2) => {
    let f1 = new Date(fecha1);
    let f2 = new Date(fecha2);
    return f1.getDate() === f2.getDate() && f1.getMonth() === f2.getMonth() && f1.getFullYear() === f2.getFullYear()
  }

}


@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-data-example-dialog.html',
})
export class DialogDataExampleDialog implements OnInit {

  filtro_fecha: Date;
  filtro_pendiente: boolean;
  filtro_cerrado: boolean;

  constructor(public dialogRef: MatDialogRef<DialogDataExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    const rightMostPos = window.innerWidth - Number(this.data.left);
    this.dialogRef.updatePosition({ top: `${this.data.top}px`, right: `${rightMostPos}px`});
    this.filtro_cerrado = this.data.cerrado;
    this.filtro_pendiente = this.data.pendiente;
    this.filtro_fecha = this.data.fecha;
  }

  onSelect(event): void {
    this.filtro_fecha= event;
  }

  cerrarDialog (): void {
    this.dialogRef.close({
      fecha: this.filtro_fecha,
      pendiente: this.filtro_pendiente,
      cerrado: this.filtro_cerrado
    });
  }

}
