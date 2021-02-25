import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailVerificacionComponent } from './email-verificacion/email-verificacion.component';
import { PswOlvidadaComponent } from './psw-olvidada/psw-olvidada.component';
import { IngresoComponent } from './ingreso/ingreso.component';
import { AngularModule } from '../angular.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthenticationService } from './service/authentication.service';
import { RegistroRoutingModule } from './registro-routing.module';

@NgModule({
  declarations: [
    IngresoComponent,
    PswOlvidadaComponent,
    EmailVerificacionComponent,
  ],
  imports: [
    RegistroRoutingModule,
    CommonModule,
    AngularModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
  ],
  providers: [
    AuthenticationService,

  ]
})
export class RegistroModule { }
