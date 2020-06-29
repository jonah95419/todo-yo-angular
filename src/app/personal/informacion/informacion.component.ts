import { Component, OnInit, ViewChild } from '@angular/core';
import { PersonalService } from '../service/personal.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { map, tap, finalize, filter } from 'rxjs/operators';
import { personalI } from '../model/personal';
import { FileHandle } from './dragDrop.Directive';
import { Observable } from 'rxjs';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from '@angular/fire/storage';
import { CotizacionDetallesService } from 'src/app/servicios/service/cotizacion_detalles.service';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'personal-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {

  @ViewChild("panel_personal") panel_personal: MatExpansionPanel;

  uploadPercent: Observable<number>;

  id: string = "";
  pathImagen: string = NOT_FOUND;

  uploadEstado: boolean = false;

  informacion: personalI;
  enUso: boolean = false;

  informacionForm = this.fb.group({
    nombre: new FormControl('', [Validators.required]),
    cargo: new FormControl('', [Validators.required]),
    mail: new FormControl('', [ Validators.email]),
    contacto: new FormControl('', [ Validators.min(900000000), Validators.max(1000000000)]),
    estado: [''],
    foto: [''],
    key: ['']
  })

  constructor(
    private fb: FormBuilder,
    private personalApi: PersonalService,
    private route: ActivatedRoute,
    private afStorage: AngularFireStorage,
    private cotizacionDetallesApi: CotizacionDetallesService) {
    route.queryParams.subscribe(
      (params: Params) => {
        const id = params.id;
        if(id) { this.obtenerInformacion(id); }
      });
   }

  ngOnInit(): void { }

  actualizarEstado = (estado: boolean) => this.personalApi.actualizarEstadoPersonal(this.id, estado)

  eliminarPersonal = () => {
    this.personalApi.eliminarPersonal(this.id);
    this.informacion = undefined;
    if(this.panel_personal != undefined) {
      this.panel_personal.close();
    }
  }

  submit = (): void => {
    if(this.informacionForm.valid) {
      let value: any = this.informacionForm.value;
      delete value['key'];
      this.personalApi.actualizarInformacion(this.id, value);
    }
  }

  getErrorNombre = () => {
    if (this.informacionForm.controls['nombre'].hasError('required')) { return 'Campo requerido.'; }
  }

  getErrorCargo = () => {
    if (this.informacionForm.controls['cargo'].hasError('required')) { return 'Campo requerido.'; }
  }

  getErrorEmail = () => {
    return this.informacionForm.controls['mail'].hasError('email') ? 'Correo electrónico no válido' : '';
  }

  getErrorContacto = () => {
    return this.informacionForm.controls['contacto'].hasError('min') || this.informacionForm.controls['contacto'].hasError('max') ? 'Número válido' : '';
  }

  onFileSelected = (event):void => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      const file = <File>event.target.files[0];
      this.cargarImagen(file);
    }
  }

  filesDropped = (files: FileHandle[]): void  =>{
    if (files.length > 0) {
      const file = files[0].file;
      this.cargarImagen(file);
    }
  }

  private cargarImagen = (imagen: File): void => {
    this.uploadEstado = true;
    const fileRef: AngularFireStorageReference = this.afStorage.ref( "personal/" + this.id + "/" + imagen.name  );
    const task: AngularFireUploadTask = this.afStorage.upload("personal/" + this.id + "/" + imagen.name, imagen);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(downloadURL => {
            this.actualizarImagen(downloadURL);
          });
        })
      ).subscribe();
  }

  private actualizarImagen = (url: string): void => {
    this.uploadEstado = false;
    this.personalApi.actualizarImagen(this.id, url, this.pathImagen);
  }

  private obtenerInformacion = (id: string): void => {
    this.id = id;
    this.personalApi.todos.pipe(
      map( (data: personalI[]) => data.filter((p:personalI) => String(p.key) == String(this.id) )[0] ),
      tap( d => this.revisarPersonalDetalles(d))
    ).toPromise();
  }

  private revisarPersonalDetalles = (p: personalI): void => {
    if(p != undefined) {
      this.cotizacionDetallesApi.todos.pipe(
        map( (data: any[]) => data.filter((d: any) => d.personal !== undefined) ),
        map( (data: any[]) => data.filter((d: any) => Object.keys(d.personal).find( dp => d.personal[dp].detalle == p.key))),
        tap( (data: any[]) => this.cargarInformacionPersonal(data.length > 0, p))
      ).toPromise();
    }
  }

  private cargarInformacionPersonal = (uso:boolean, d: personalI): void => {
    this.enUso = uso;
    this.informacion = d;
    this.informacionForm.setValue(d);
    this.pathImagen = d.foto != undefined && d.foto != "" ? d.foto : NOT_FOUND;
  }

}

const NOT_FOUND = "https://toppng.com/uploads/preview/user-font-awesome-nuevo-usuario-icono-11563566658mjtfvilgcs.png";
