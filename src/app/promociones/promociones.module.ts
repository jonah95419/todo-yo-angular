import { NgModule } from '@angular/core';
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
  ],
  exports: [
    AngularModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    PromocionesService,

  ]
})
export class PromocionesModule { }
