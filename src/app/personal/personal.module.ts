import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalComponent } from './personal/personal.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AngularModule } from '../angular.module';
import { AppRoutingModule } from '../app-routing.module';
import { InformacionComponent } from './informacion/informacion.component';
import { RendimientoComponent } from './rendimiento/rendimiento.component';
import { HistorialComponent } from './historial/historial.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DragDirective } from './informacion/dragDrop.Directive';
import { RatingModule } from 'ng-starrating';


@NgModule({
  declarations: [PersonalComponent, PerfilComponent, InformacionComponent, RendimientoComponent, HistorialComponent, DragDirective],
  imports: [
    AppRoutingModule,
    CommonModule,
    AngularModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    RatingModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
  ],
  exports: [
    AngularModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class PersonalModule { }
