import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiciosComponent } from './servicios/servicios/servicios.component';
import { PromocionesComponent } from './promociones/promociones/promociones.component';
import { PersonalComponent } from './personal/personal/personal.component';
import { CotizacionComponent } from './servicios/cotizacion/cotizacion.component';
import { PerfilComponent } from './personal/perfil/perfil.component';
import { CotizacionDetallesComponent } from './servicios/cotizacion-detalles/cotizacion-detalles.component';
import { PromocionesDetallesComponent } from './promociones/promociones-detalles/promociones-detalles.component';

const routes: Routes = [
  { path: '', redirectTo: 'servicios', pathMatch: 'full' },
  { path: 'servicios', component: ServiciosComponent, children: [
    { path: '', redirectTo: 'cotizacion', pathMatch: 'full' },
    { path: 'cotizacion/:tipo', component: CotizacionComponent, children: [
      { path: 'detalles', component: CotizacionDetallesComponent},
    ]},
  ]},
  { path: 'promociones', component: PromocionesComponent, children: [
    { path: '', redirectTo: 'texto', pathMatch: 'full' },
    { path: 'texto', component: PromocionesDetallesComponent},
    { path: 'imagent', component: PromocionesDetallesComponent},
    { path: 'videot', component: PromocionesDetallesComponent},
  ]},
  { path: 'personal', component: PersonalComponent, children: [
      {path: 'perfil', component: PerfilComponent}
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
