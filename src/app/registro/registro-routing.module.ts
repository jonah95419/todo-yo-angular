import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IngresoComponent } from './ingreso/ingreso.component';
import { SecureInnerPagesGuard } from '../guard/secure-inner-pages.guard';

const routes: Routes = [
  {
    path: '', component: IngresoComponent, canActivate: [SecureInnerPagesGuard]
  }
  // { path: 'psw-olvidada', component: PswOlvidadaComponent, canActivate: [SecureInnerPagesGuard] },
  // { path: 'email-verificacion', component: EmailVerificacionComponent, canActivate: [SecureInnerPagesGuard] },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroRoutingModule { }
