import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database
import { BehaviorSubject } from 'rxjs';
import { UsuarioI  } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private _todos = new BehaviorSubject<UsuarioI[]>([]);
  private dataStore: { usuarios: UsuarioI[] } = { usuarios: [] };
  readonly todos = this._todos.asObservable();

  constructor(private db: AngularFireDatabase) { }

  cargarTodo = () => {
     this.db.list('usuario').snapshotChanges().subscribe(
      (data: any[]) => {
        this.dataStore.usuarios = data.map( item => {
          let a = item.payload.toJSON();
          a['key'] = item.key;
          return a;
        });
        this._todos.next(Object.assign({}, this.dataStore).usuarios);
      }
    );
  }
}
