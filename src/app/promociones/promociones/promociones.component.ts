import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { PromocionesService } from '../service/promociones.service';
import { Observable } from 'rxjs';
import { promocionesI } from '../model/pomociones';
import { map, finalize } from 'rxjs/operators';
import { MatExpansionPanel } from '@angular/material/expansion';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from '@angular/fire/storage';
@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.css']
})
export class PromocionesComponent implements OnInit, OnDestroy {

  @ViewChild("panel_promocion") panel_promocion: MatExpansionPanel;

  privadas$: Observable<promocionesI[]>;
  publicas$: Observable<promocionesI[]>;
  historial$: Observable<promocionesI[]>;

  uploadPercent$: Observable<number>;

  pathImagen: string = NOT_FOUND;
  locale: string;

  uploadEstado: boolean = false;
  imagen: boolean = false;

  imageSrc: any;
  file: File | null = null;

  informacionForm = this.fb.group({
    descripcion: new FormControl('', [Validators.required]),
    nombre1: new FormControl('', [Validators.required]),
    subtitulo: new FormControl(''),
    fecha: new FormControl(new Date, [Validators.required]),
  })

  private _translate;

  constructor(
    private afStorage: AngularFireStorage,
    private promocionesApi: PromocionesService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private translate: TranslateService,) {
      translate.setDefaultLang('es');
      translate.use('es');
      this.cargarDatos();

  }

  ngOnInit(): void {
    this.locale = this.translate.currentLang;
    this._translate = this.translate.onLangChange
    .subscribe((langChangeEvent: LangChangeEvent) => {this.locale = langChangeEvent.lang;})
  }

  ngOnDestroy(): void {
    if(this._translate != undefined) {
      this._translate.unsubscribe();
    }
  }

  nuevoRegistro = () =>  this.panel_promocion.open();

  eliminarPromocion = (key: string) => this.promocionesApi.eliminarPromocion(key);

  cancelarRegistro = () => {
    this.panel_promocion.close();
    this.informacionForm.reset();
    this.cancelarImagen();
  }

  cancelarImagen() {
    this.imageSrc = undefined;
    this.imagen = false;
    this.file = null;
    this.uploadEstado = false;
  }

  submit = () => {
    if(this.informacionForm.valid) {
      let p = this.informacionForm.value;
      if(this.imagen) {
        p.tipo = "2";
        this.cargarImagen(p);
      } else {
        p.tipo = "1";
        this.promocionesApi.agregarPromocion(p);
      }
      this.cancelarRegistro();
    }
  }

  getErrorNombre = () => {
    if (this.informacionForm.controls['nombre1'].hasError('required')) { return 'Requerido.'; }
  }

  getErrorDescripcion = () => {
    if (this.informacionForm.controls['descripcion'].hasError('required')) { return 'Requerido.'; }
  }

  getErrorFecha = () => {
    if (this.informacionForm.controls['fecha'].hasError('required')) { return 'Requerido.'; }
  }

  actualizarEstado = (key: string, estado: boolean, historial: boolean) => this.promocionesApi.actualizarEstado(key, estado, historial);

  onFileSelected = (event):void => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.file = <File>event.target.files[0];
      const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.file));
      this.imageSrc = url;
      this.imagen = true;
    }
  }

  private cargarDatos = () => {
    this.publicas$ = this.promocionesApi.todos.pipe(
      map( data => data.filter(d => d.estado && !d.historial))
    )

    this.privadas$ = this.promocionesApi.todos.pipe(
      map( data => data.filter(d => !d.estado && !d.historial))
    )

    this.historial$ = this.promocionesApi.todos.pipe(
      map( data => data.filter(d => d.historial))
    )
  }

  private cargarImagen = (promocion): void => {
    this.uploadEstado = true;
    const fileRef: AngularFireStorageReference = this.afStorage.ref( "promociones/" + this.file.name  );
    const task: AngularFireUploadTask = this.afStorage.upload("promociones/" + this.file.name, this.file);
    this.uploadPercent$ = task.percentageChanges();
    task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(downloadURL => {
            promocion.url = downloadURL;
            this.promocionesApi.agregarPromocion(promocion);
            this.cancelarRegistro();
          });
        })
      ).subscribe();
  }

}

const NOT_FOUND = "https://toppng.com/uploads/preview/user-font-awesome-nuevo-usuario-icono-11563566658mjtfvilgcs.png";
