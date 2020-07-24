import { Component, OnInit, ViewChild } from '@angular/core';
import { PersonalService } from '../service/personal.service';
import { MatExpansionPanel } from '@angular/material/expansion';
import { FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  @ViewChild("panel_personal") panel_personal: MatExpansionPanel;

  pathImagen: string = NOT_FOUND;

  informacionForm = this.fb.group({
    nombre: new FormControl('', [Validators.required]),
    cargo: new FormControl('', [Validators.required]),
    mail: new FormControl(''),
    contacto: new FormControl(''),
    estado: [true],
    foto: new FormControl('')
  })

  constructor(
    public personalApi: PersonalService,
    private fb: FormBuilder,) { }

  ngOnInit(): void {
  }

  nuevoRegistro = () =>  this.panel_personal.open();

  cancelarRegistro = () => {
    this.panel_personal.close();
    this.informacionForm.reset();
  }

  submit = () => {
    if(this.informacionForm.valid) {
      this.personalApi.agregarPersonal(this.informacionForm.value);
      this.cancelarRegistro();
    }
  }

  getErrorNombre = () => {
    if (this.informacionForm.controls['nombre'].hasError('required')) { return 'Requerido.'; }
  }

  getErrorCargo = () => {
    if (this.informacionForm.controls['cargo'].hasError('required')) { return 'Requerido.'; }
  }

}

const NOT_FOUND = "https://toppng.com/uploads/preview/user-font-awesome-nuevo-usuario-icono-11563566658mjtfvilgcs.png";
