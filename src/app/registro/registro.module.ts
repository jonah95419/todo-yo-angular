import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailVerificacionComponent } from './email-verificacion/email-verificacion.component';
import { PswOlvidadaComponent } from './psw-olvidada/psw-olvidada.component';
import { IngresoComponent } from './ingreso/ingreso.component';
import { AppRoutingModule } from '../app-routing.module';
import { AngularModule } from '../angular.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthenticationService } from './service/authentication.service';

@NgModule({
  declarations: [
    IngresoComponent,
    PswOlvidadaComponent,
    EmailVerificacionComponent,
  ],
  imports: [
    AppRoutingModule,
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
    AuthenticationService,

  ]
})
export class RegistroModule { }
