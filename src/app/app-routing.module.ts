import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiciosComponent } from './servicios/servicios/servicios.component';
import { PromocionesComponent } from './promociones/promociones/promociones.component';
import { PersonalComponent } from './personal/personal/personal.component';
import { CotizacionComponent } from './servicios/cotizacion/cotizacion.component';
import { PerfilComponent } from './personal/perfil/perfil.component';
import { CotizacionDetallesComponent } from './servicios/cotizacion-detalles/cotizacion-detalles.component';
import { UsuariosComponent } from './usuarios/usuarios/usuarios.component';
import { IngresoComponent } from './registro/ingreso/ingreso.component';
import { PswOlvidadaComponent } from './registro/psw-olvidada/psw-olvidada.component';
import { EmailVerificacionComponent } from './registro/email-verificacion/email-verificacion.component';
import { SecureInnerPagesGuard } from './guard/secure-inner-pages.guard';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/servicios', pathMatch: 'full' },
  { path: 'servicios', component: ServiciosComponent, canActivate: [AuthGuard] , children: [
    { path: '', redirectTo: 'cotizacion', pathMatch: 'full' },
    { path: 'cotizacion/:tipo', component: CotizacionComponent, children: [
      { path: 'detalles', component: CotizacionDetallesComponent},
    ]},
  ]},
  { path: 'promociones', component: PromocionesComponent, canActivate: [AuthGuard]},
  { path: 'personal', component: PersonalComponent, canActivate: [AuthGuard], children: [
      {path: 'perfil', component: PerfilComponent}
  ]},
  { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard]},
  { path: 'ingreso', component: IngresoComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'psw-olvidada', component: PswOlvidadaComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'email-verificacion', component: EmailVerificacionComponent, canActivate: [SecureInnerPagesGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
