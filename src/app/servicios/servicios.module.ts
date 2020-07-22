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
import { Servicio1Service } from './service/servicios1.service';
import { Servicio2Service } from './service/servicios2.service';
import { Servicio3Service } from './service/servicios3.service';
import { Servicio4Service } from './service/servicios4.service';
import { Servicio5Service } from './service/servicios5.service';
import { Servicio6Service } from './service/servicios6.service';
import { CotizacionService } from './service/cotizacion.service';
import { CotizacionDetallesService } from './service/cotizacion_detalles.service';
import { UsuariosService } from './service/usuarios.service';
import { Servicio7Service } from './service/servicios7.service';



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
  ],
  providers: [
    Servicio1Service,
    Servicio2Service,
    Servicio3Service,
    Servicio4Service,
    Servicio5Service,
    Servicio6Service,
    Servicio7Service,
    CotizacionService,
    CotizacionDetallesService,
    UsuariosService,
  ]
})
export class ServiciosModule { }
