import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromocionesComponent } from './promociones/promociones.component';
import { AppRoutingModule } from '../app-routing.module';
import { AngularModule } from '../angular.module';



@NgModule({
  declarations: [PromocionesComponent],
  imports: [
    AppRoutingModule,
    CommonModule,
    AngularModule
  ],
  exports: [
    AngularModule
  ]
})
export class PromocionesModule { }
