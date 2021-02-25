import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiciosComponent } from './servicios/servicios.component';
import { AngularModule } from '../angular.module';
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
import { UsuariosService } from '../usuarios/service/usuarios.service';
import { Servicio7Service } from './service/servicios7.service';
import { ServiciosRoutingModule } from './servicios-routing.module';

@NgModule({
  declarations: [
    ServiciosComponent,
    CotizacionComponent,
    CotizacionDetallesComponent,
    DialogDataExampleDialog],
  imports: [
    ServiciosRoutingModule,
    CommonModule,
    AngularModule,
    NgImageSliderModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ChatModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
  ],
  entryComponents: [
    DialogDataExampleDialog
  ],

})
export class ServiciosModule {
  constructor(@Optional() @SkipSelf() parentModule?: ServiciosModule) {

    if (parentModule) {
      throw new Error(
        'ServiciosModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders<ServiciosModule> {
    return {
      ngModule: ServiciosModule,
      providers: [
        {provide: Servicio1Service },
        {provide: Servicio2Service },
        {provide: Servicio3Service },
        {provide: Servicio4Service },
        {provide: Servicio5Service },
        {provide: Servicio6Service },
        {provide: Servicio7Service },
        {provide: CotizacionService },
        {provide: CotizacionDetallesService },
        {provide: UsuariosService }
      ]
    };
  }
}
