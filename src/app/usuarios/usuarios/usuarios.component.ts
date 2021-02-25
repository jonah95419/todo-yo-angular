import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../service/usuarios.service';
import { tap } from 'rxjs/operators';
import { UsuarioI  } from '../model/usuario';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  pathImagen: string = "/assets/images/person.svg";

  user: UsuarioI;
  servicio: any = {
    key:"2020",
    name: ""
  };

  constructor(public usuariosApi: UsuariosService,) { }

  ngOnInit(): void {
  }

  seleccionarChat = (usuario: UsuarioI) =>  {
    this.user = usuario;
    this.servicio.name = usuario.name;
  }

}
