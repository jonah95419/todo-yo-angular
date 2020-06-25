import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiciosComponent } from './servicios/servicios/servicios.component';
import { PromocionesComponent } from './promociones/promociones/promociones.component';
import { PersonalComponent } from './personal/personal/personal.component';
import { AlbanieleriaComponent } from './servicios/albanieleria/albanieleria.component';
import { AlbanieleriaCotizacionComponent } from './servicios/albanieleria-cotizacion/albanieleria-cotizacion.component';

const routes: Routes = [
  { path: '', redirectTo: 'servicios', pathMatch: 'full' },
  { path: 'servicios', component: ServiciosComponent, children: [
    { path: '', redirectTo: 'albañileria', pathMatch: 'full' },
    { path: 'albañileria', component: AlbanieleriaComponent, children: [
      { path: 'cotizaciones', component: AlbanieleriaCotizacionComponent},
    ]},
    { path: 'electricidad', component: PersonalComponent},
    { path: 'gypsuma', component: PersonalComponent},
    { path: 'mecanicai', component: PersonalComponent},
    { path: 'plomeria', component: PersonalComponent},
    { path: 'seguridade', component: PersonalComponent},
  ]},
  { path: 'promociones', component: PromocionesComponent, children: [
    { path: '', redirectTo: 'texto', pathMatch: 'full' },
    { path: 'texto', component: PersonalComponent},
    { path: 'imagent', component: PersonalComponent},
    { path: 'videot', component: PersonalComponent},
  ]},
  { path: 'personal', component: PersonalComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
