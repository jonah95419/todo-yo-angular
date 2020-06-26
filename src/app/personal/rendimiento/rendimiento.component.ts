import { Component, OnInit } from '@angular/core';
import { InteraccionService } from '../service/interaccion.service';
import { Params, ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { combinarTablasInteraccion } from '../../utils/obtenerInteracciones';
import { combineLatest, Observable } from 'rxjs';
import { UsuariosService } from 'src/app/servicios/service/usuarios.service';

@Component({
  selector: 'personal-rendimiento',
  templateUrl: './rendimiento.component.html',
  styleUrls: ['./rendimiento.component.css']
})
export class RendimientoComponent implements OnInit {

  interacciones$: Observable<any[]>;
  totalstar = 5;

  constructor(
    private route: ActivatedRoute,
    private interaccionApi: InteraccionService,
    private usuariosApi: UsuariosService) {
    route.queryParams.subscribe(
      (params: Params) => {
        const id = params.id;
        if(id) { this.obtenerInformacion(id); }
      });
   }

  ngOnInit(): void {  }

  private obtenerInformacion = (id: string) => {
    this.interacciones$ = combineLatest(
      this.interaccionApi.cargarTodo(id),
      this.usuariosApi.todos)
    .pipe(
      map( data => combinarTablasInteraccion(data[0], data[1]))
    )
  }

}
