import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database
import { BehaviorSubject } from 'rxjs';
import { cotizacionI } from '../model/cotizacion';

@Injectable({
  providedIn: 'root'
})
export class CotizacionDetallesService {

  private _todos = new BehaviorSubject<any[]>([]);
  private dataStore: { detalles: any[] } = { detalles: [] };
  readonly todos = this._todos.asObservable();

  constructor(private db: AngularFireDatabase) { }

  cargarTodo = () => {
     this.db.list('detalle').snapshotChanges().subscribe(
      (data: any[]) => {
        this.dataStore.detalles = data.map( item => {
          let a = item.payload.toJSON();
          a['key'] = item.key;
          return a;
        });
        this._todos.next(Object.assign({}, this.dataStore).detalles);
      }
    );
  }

  registrarDetalle = (key: String, tipo: String, detalle: any) => this.db.list('detalle/' + key + "/" + tipo).push(detalle);

  eliminarDetalle = (key: String, tipo: String, key_detalle: String) => this.db.object('detalle/' + key + "/" + tipo + "/" + key_detalle).remove();

  actualizarVisibilidadDetalle = (key: String, estado: Boolean) => this.db.object('detalle/' + key).update({visibilidad: estado});

}
