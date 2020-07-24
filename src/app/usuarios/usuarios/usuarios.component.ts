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

  pathImagen: string = NOT_FOUND;

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

const NOT_FOUND = "https://toppng.com/uploads/preview/user-font-awesome-nuevo-usuario-icono-11563566658mjtfvilgcs.png";
