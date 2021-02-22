import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiciosComponent } from './servicios/servicios.component';
import { AuthGuard } from '../guard/auth.guard';
import { CotizacionComponent } from './cotizacion/cotizacion.component';
import { CotizacionDetallesComponent } from './cotizacion-detalles/cotizacion-detalles.component';

const routes: Routes = [
  {
    path: '',
    component: ServiciosComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'cotizacion', pathMatch: 'full' },
      {
        path: 'cotizacion/:tipo',
        component: CotizacionComponent,
        children: [
          {
            path: 'detalles',
            component: CotizacionDetallesComponent
          },
        ]
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiciosRoutingModule { }
