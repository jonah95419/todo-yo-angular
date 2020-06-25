import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CotizacionService } from '../service/cotizacion.service';
import { CotizacionDetallesService } from '../service/cotizacion_detalles.service';
import { Observable, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { combinarTablas } from '../../utils/obtenerCotizacionDetalles';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-albanieleria-cotizacion',
  templateUrl: './albanieleria-cotizacion.component.html',
  styleUrls: ['./albanieleria-cotizacion.component.css']
})
export class AlbanieleriaCotizacionComponent implements OnInit {

  @ViewChild("panel_material") panel_material: MatExpansionPanel;
  @ViewChild("panel_equipos") panel_equipos: MatExpansionPanel;
  @ViewChild("panel_personal") panel_personal: MatExpansionPanel;

  key: String;
  cotizacion$: Observable<any>

  btn_detalle_personal: boolean = false;
  btn_detalle_material: boolean = false;
  btn_detalle_equipo: boolean = false;

  locale: string;

  displayedColumns: string[] = ['cant', 'detalle', 'subtotal', 'accion'];

  dataSource = [];
  imageObject = [];

  personalForm = this.fb.group({})

  materialForm = this.fb.group({
    cant: new FormControl('', [Validators.required, Validators.min(0)]),
    detalle: new FormControl('', [Validators.required]),
    subtotal: new FormControl('', [Validators.required, Validators.min(0)])
  })

  equipoForm = this.fb.group({
    cant: new FormControl('', [Validators.required, Validators.min(0)]),
    detalle: new FormControl('', [Validators.required]),
    subtotal: new FormControl('', [Validators.required, Validators.min(0)])
  })

  private total$: number = 0;
  get total(): number { return this.total$; }
  set total(value: number) { this.total$ = value; }

  private _translate;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private cotizacionApi: CotizacionService,
    private cotizacionDetalleApi: CotizacionDetallesService) {
      translate.setDefaultLang('es');
      translate.use('es');
  }

  ngOnInit(): void {
    this.locale = this.translate.currentLang;
    this._translate =  this.translate.onLangChange
    .subscribe((langChangeEvent: LangChangeEvent) => {this.locale = langChangeEvent.lang;})

    this.route.queryParams.subscribe(
      (params: Params) => {
        const key = params.key;
        if(key) { this.obtenerCotizacionDetalle(key); }
      });
  }

  actualizarEstado = ( event: MatSlideToggleChange, usuario: String) => this.cotizacionApi.actualizarEstadoCotizacion(usuario, this.key, event.checked);

  actualizarVisibilidad = (estado: boolean) => this.cotizacionDetalleApi.actualizarVisibilidadDetalle(this.key, estado);

  detalle = (detalleP: boolean, detalleM: boolean, detalleE: boolean): void => {

    this.btn_detalle_equipo = detalleE;
    this.btn_detalle_material = detalleM;
    this.btn_detalle_personal = detalleP;

    if(!detalleP) { this.panel_personal.open(); }

    if(!detalleM) { this.panel_material.open(); }

    if(!detalleE) { this.panel_equipos.open(); }
  }

  cancelarDetalle = (): void => {
    if(this.panel_material !== undefined) {
      this.panel_material.close();
      this.materialForm.reset();
    }
    if(this.panel_equipos !== undefined) {
      this.panel_equipos.close();
      this.equipoForm.reset();
    }
    if(this.panel_personal !== undefined) {
      this.panel_personal.close();
    }
    this.btn_detalle_equipo = false;
    this.btn_detalle_material = false;
    this.btn_detalle_personal = false;

  }

  eliminarDetalle = (t: string, k: string) => this.cotizacionDetalleApi.eliminarDetalle(this.key, t, k);

  submitMaterial = () => {
    if(this.materialForm.valid) {
      this.cotizacionDetalleApi.registrarDetalle(this.key, "material", this.materialForm.value);
      this.cancelarDetalle();
    }
  }

  submitEquipos= () => {
    if(this.equipoForm.valid) {
      this.cotizacionDetalleApi.registrarDetalle(this.key, "equipo", this.equipoForm.value);
      this.cancelarDetalle();
    }
  }


  getErrorCantMaterial = () => {
    if (this.materialForm.controls['cant'].hasError('required')) { return 'Requerido.'; }
    return this.materialForm.controls['cant'].hasError('min') ? 'No válido' : '';
  }

  getErrorSubtotalMaterial = () => {
    if (this.materialForm.controls['subtotal'].hasError('required')) { return 'Requerido.'; }
    return this.materialForm.controls['subtotal'].hasError('min') ? 'No válido' : '';
  }

  getErrorDetalleMaterial = () => {
    if (this.materialForm.controls['detalle'].hasError('required')) { return 'Requerido.'; }
  }

  getErrorCantEquipo = () => {
    if (this.equipoForm.controls['cant'].hasError('required')) { return 'Req.'; }
    return this.equipoForm.controls['cant'].hasError('min') ? 'No válido' : '';
  }

  getErrorSubtotalEquipo = () => {
    if (this.equipoForm.controls['subtotal'].hasError('required')) { return 'Req.'; }
    return this.equipoForm.controls['subtotal'].hasError('min') ? 'No válido' : '';
  }

  getErrorDetalleEquipo = () => {
    if (this.equipoForm.controls['detalle'].hasError('required')) { return 'Requerido'; }
  }

  private obtenerCotizacionDetalle = (key: String):void => {
    this.key = key;
    this.cancelarDetalle();
    this.cotizacion$ = combineLatest(
      this.cotizacionApi.todos,
      this.cotizacionDetalleApi.todos)
    .pipe(
      map( data => combinarTablas(key, data[0], data[1])),
      tap( data => { if(data !== undefined) {
        this.procesarFotografias(data.cotizacion.fotografias)
        this.procesarDetalles(data.detalles)
      }})
    )
  }

  private procesarFotografias = (fotografias: Object):void => {
    this.imageObject = Object.keys(fotografias).map(k => { return {
        image: fotografias[k],
        thumbImage: fotografias[k],
        title: ""
      }
    });
  }

  private procesarDetalles = (detalles: Object): void => {
    let jojo: DetallesI[] = [];
    Object.keys(detalles).forEach(k => {
      if(k !== "key" && k !== "visibilidad") {
        jojo.push({cant: 0, detalle: k, subtotal: 0, key:"interestelar", tipo: k})
        Object.keys(detalles[k]).forEach(kd => {
          jojo.push({
            cant: detalles[k][kd].cant || 0,
            detalle: detalles[k][kd].detalle || "",
            subtotal: detalles[k][kd].subtotal || 0,
            key: kd || "",
            tipo: k
          })
        })
      }
    });
    this.total = this.calcularTotal(jojo);
    this.dataSource = jojo;
  }

  private calcularTotal = (detalles): number => detalles.map(t => Number(t.subtotal) * Number(t.cant)).reduce((acc, value) => acc + value, 0)

}

interface DetallesI {
  cant: number;
  detalle: string;
  subtotal: number;
  key: string;
  tipo: string;
}
