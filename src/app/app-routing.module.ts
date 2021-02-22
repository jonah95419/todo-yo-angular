import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/servicios', pathMatch: 'full' },
  {
    path: 'servicios',
    loadChildren: () => import('./servicios/servicios.module').then(m => m.ServiciosModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'promociones',
    loadChildren: () => import('./promociones/promociones.module').then(m => m.PromocionesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'personal',
    loadChildren: () => import('./personal/personal.module').then(m => m.PersonalModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'ingreso',
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
