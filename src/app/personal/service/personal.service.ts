import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database
import { BehaviorSubject } from 'rxjs';
import { PersonalI  } from '../model/personal';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  private _todos = new BehaviorSubject<PersonalI[]>([]);
  private dataStore: { personal: PersonalI[] } = { personal: [] };
  readonly todos = this._todos.asObservable();

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage, private _snackBar: MatSnackBar) { }

  cargarTodo = () => {
     this.db.list('personal').snapshotChanges().subscribe(
      (data: any[]) => {
        this.dataStore.personal = data.map( item => {
          let a = item.payload.toJSON();
          a['key'] = item.key;
          return a;
        });
        this._todos.next(Object.assign({}, this.dataStore).personal);
      }
    );
  }

  agregarPersonal = (informacion: any) => {
    let nuevo: PersonalI = {
      nombre: informacion.nombre,
      cargo: informacion.cargo,
      mail: '',
      contacto: '',
      estado: true,
      foto: ''
    }
    this.db.list('personal').push(nuevo)
    .then(value => { this.openSnackBar("Registro actualizado", "Ok") })
    .catch( error => { this.openSnackBar("Ah ocurrido un error", "Ok")})
  }

  actualizarEstadoPersonal = (id: string, estado: boolean) => {
    this.db.object('personal/' + id).update({estado})
    .then(value => { this.openSnackBar("Registro actualizado", "Ok") })
    .catch( error => { this.openSnackBar("Ah ocurrido un error", "Ok")})
  }

  actualizarInformacion = (id: string, informacion: any) => {
    this.db.object('personal/' + id).update(informacion)
    .then(value => { this.openSnackBar("Registro actualizado", "Ok") })
    .catch( error => { this.openSnackBar("Ah ocurrido un error", "Ok")})
  }

  actualizarImagen = (id: string, url: string, url_anterior: string) => {
    this.db.object('personal/' + id).update({foto: url})
    .then(value => { this.delete(url_anterior); this.openSnackBar("Registro actualizado", "Ok") })
    .catch( error => { this.openSnackBar("Ah ocurrido un error", "Ok")})
  }

  eliminarPersonal = (id: string) => {
    this.db.object('personal/' + id).remove()
    .then(value => { this.openSnackBar("Registro eliminado", "Ok") })
    .catch( error => { this.openSnackBar("Ah ocurrido un error", "Ok")})
  }

  private delete(downloadUrl) {
    return this.storage.storage.refFromURL(downloadUrl).delete();
  }

  private openSnackBar = (message: string, action: string) => {
    this._snackBar.open(message, action, { duration: 5000 });
  }

}
