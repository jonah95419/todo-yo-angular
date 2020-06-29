import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CotizacionService } from '../service/cotizacion.service';
import { CotizacionDetallesService } from '../service/cotizacion_detalles.service';
import { Observable, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { obtenerCotizacionDetalles } from '../../utils/obtenerCotizacionDetalles';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { FormBuilder, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { PersonalService } from '../../personal/service/personal.service';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-cotizacion-detalles',
  templateUrl: './cotizacion-detalles.component.html',
  styleUrls: ['./cotizacion-detalles.component.css']
})
export class CotizacionDetallesComponent implements OnInit {

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

  matcher = new MyErrorStateMatcher();

  personalForm = this.fb.group({
    cant: new FormControl('', [Validators.required, Validators.min(1)]),
    detalle: new FormControl('', [Validators.required]),
    subtotal: new FormControl('', [Validators.required, Validators.min(0)])
  })

  materialForm = this.fb.group({
    cant: new FormControl('', [Validators.required, Validators.min(1)]),
    detalle: new FormControl('', [Validators.required]),
    subtotal: new FormControl('', [Validators.required, Validators.min(0)])
  })

  equipoForm = this.fb.group({
    cant: new FormControl('', [Validators.required, Validators.min(1)]),
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
    private cotizacionDetalleApi: CotizacionDetallesService,
    public personalApi: PersonalService) {
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

  submitPersonal = () => {
    if(this.personalForm.valid) {
      this.cotizacionDetalleApi.registrarDetalle(this.key, "personal", this.personalForm.value);
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

  getErrorCantPersonal = () => {
    if (this.personalForm.controls['cant'].hasError('required')) { return 'Req.'; }
    return this.personalForm.controls['cant'].hasError('min') ? 'No válido' : '';
  }

  getErrorSubtotalPersonal = () => {
    if (this.personalForm.controls['subtotal'].hasError('required')) { return 'Req.'; }
    return this.personalForm.controls['subtotal'].hasError('min') ? 'No válido' : '';
  }

  getErrorDetallePersonal = () => {
    if (this.personalForm.controls['detalle'].hasError('required')) { return 'Requerido'; }
  }

  private obtenerCotizacionDetalle = (key: string):void => {
    this.key = key;
    this.cancelarDetalle();
    this.cotizacion$ = combineLatest(
      this.cotizacionApi.todos,
      this.cotizacionDetalleApi.todos,
      this.personalApi.todos)
    .pipe(
      map( data => new obtenerCotizacionDetalles(key, data[0], data[1], data[2]).combinarTablas()),
      tap( data => { if(data !== undefined) {
        this.imageObject = this.procesarFotografias(data.cotizacion.fotografias)
        this.total = this.calcularTotal(data.detalles);
        this.dataSource = data.detalles;
      }})
    )
  }

  private procesarFotografias (fotografias: Object): any[] {
    return Object.keys(fotografias).map(k => { return {
        image: fotografias[k],
        thumbImage: fotografias[k],
        title: ""
      }
    });
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

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}