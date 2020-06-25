import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiciosComponent } from './servicios/servicios.component';
import { AngularModule } from '../angular.module';
import { AppRoutingModule } from '../app-routing.module';
import { AlbanieleriaComponent } from './albanieleria/albanieleria.component';
import { AlbanieleriaCotizacionComponent } from './albanieleria-cotizacion/albanieleria-cotizacion.component';

import { NgImageSliderModule } from 'ng-image-slider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ServiciosComponent, AlbanieleriaComponent, AlbanieleriaCotizacionComponent],
  imports: [
    AppRoutingModule,
    CommonModule,
    AngularModule,
    NgImageSliderModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),

  ],
  exports: [
    AngularModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class ServiciosModule { }
