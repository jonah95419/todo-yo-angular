import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiciosComponent } from './servicios/servicios.component';
import { AngularModule } from '../angular.module';
import { AppRoutingModule } from '../app-routing.module';
import { CotizacionComponent, DialogDataExampleDialog } from './cotizacion/cotizacion.component';

import { NgImageSliderModule } from 'ng-image-slider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CotizacionDetallesComponent } from './cotizacion-detalles/cotizacion-detalles.component';
import { ChatModule } from '../chat/chat.module';


@NgModule({
  declarations: [
    ServiciosComponent,
    CotizacionComponent,
    CotizacionDetallesComponent,
    DialogDataExampleDialog],
  imports: [
    AppRoutingModule,
    CommonModule,
    AngularModule,
    NgImageSliderModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ChatModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),

  ],
  exports: [
    AngularModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    //ChatModule
  ],
  entryComponents: [
    DialogDataExampleDialog
  ]
})
export class ServiciosModule { }
