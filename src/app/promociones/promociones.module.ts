import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromocionesComponent } from './promociones/promociones.component';
import { AngularModule } from '../angular.module';
import { PromocionesService } from './service/promociones.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PromocionesRoutingModule } from './promociones-routing.module';

@NgModule({
  declarations: [PromocionesComponent],
  imports: [
    PromocionesRoutingModule,
    CommonModule,
    AngularModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
  ]
})

export class PromocionesModule {

  constructor(@Optional() @SkipSelf() parentModule?: PromocionesModule) {

    if (parentModule) {
      throw new Error(
        'PromocionesModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders<PromocionesModule> {
    return {
      ngModule: PromocionesModule,
      providers: [
        {provide: PromocionesService }
      ]
    };
  }
 }
