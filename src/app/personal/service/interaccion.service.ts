import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject, SnapshotAction } from '@angular/fire/database';  // Firebase modules for Database
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireStorage } from 'angularfire2/storage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InteraccionService {

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage, private _snackBar: MatSnackBar) { }

  cargarTodo = (id: string): Observable<SnapshotAction<any>[]> => {
    return this.db.list('interaccion/' + id).snapshotChanges().pipe(
      map((data: any[]) => data.map( item => {
          let a = item.payload.toJSON();
          a['key'] = item.key;
          return a;
        })
      )
    )
  }

  actualizarEstadoPersonal = (id: string, estado: boolean) => {
    this.db.object('personal/' + id).update({estado})
    .then(value => { this.openSnackBar("Registro actualizado", "Ok") })
    .catch( error => { this.openSnackBar("Ah ocurrido un error", "Ok")})
  }


  private openSnackBar = (message: string, action: string) => {
    this._snackBar.open(message, action, { duration: 5000 });
  }

}
