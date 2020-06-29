import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database
import { BehaviorSubject } from 'rxjs';
import { promocionesI } from '../model/pomociones';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PromocionesService {

  private _todos = new BehaviorSubject<promocionesI[]>([]);
  private dataStore: { promociones: promocionesI[] } = { promociones: [] };
  readonly todos = this._todos.asObservable();

  constructor(private db: AngularFireDatabase, private _snackBar: MatSnackBar) { }

  cargarTodo = () => {
     this.db.list('promocion').snapshotChanges().subscribe(
      (data: any[]) => {
        this.dataStore.promociones = data.map( item => {
          let a = item.payload.toJSON();
          a['key'] = item.key;
          return a;
        });
        this._todos.next(Object.assign({}, this.dataStore).promociones);
      }
    );
  }

  agregarPromocion = (p: any) => {
    const nuevaPromo: promocionesI = {
      descripcion: p.descripcion,
      estado: false,
      fecha: new Date(p.fecha).toString(),
      nombre1: p.nombre1,
      subtitulo: p.subtitulo || "",
      tipo: p.tipo,
      url: p.url || "",
      historial: false,
    }
    this.db.list("promocion").push(nuevaPromo)
    .then(value => { this.openSnackBar("Registro agregado", "Ok") })
    .catch( error => { this.openSnackBar("Ah ocurrido un error", "Ok")})
  }

  actualizarEstado = (key: string, estado: Boolean, historial: Boolean) => {
    this.db.object("promocion/" + key).update({estado, historial})
    .then(value => { this.openSnackBar("Registro actualizado", "Ok") })
    .catch( error => { this.openSnackBar("Ah ocurrido un error", "Ok")})
  }

  eliminarPromocion = (key: string) => {
    this.db.object("promocion/" + key).remove()
    .then(value => { this.openSnackBar("Registro eliminado", "Ok") })
    .catch( error => { this.openSnackBar("Ah ocurrido un error", "Ok")})
  }

  private openSnackBar = (message: string, action: string) => {
    this._snackBar.open(message, action, { duration: 5000 });
  }

}
