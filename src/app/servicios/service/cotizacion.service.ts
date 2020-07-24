import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database
import { BehaviorSubject } from 'rxjs';
import { cotizacionI } from '../model/cotizacion';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {

  private _todos = new BehaviorSubject<any[]>([]);
  private dataStore: { cotizaciones: any[] } = { cotizaciones: [] };
  readonly todos = this._todos.asObservable();

  constructor(private db: AngularFireDatabase) { }

  cargarTodo = () => {
     this.db.list('cotizacion').snapshotChanges().subscribe(
      (data: any[]) => {
        this.dataStore.cotizaciones = data.map( item => {
          let a = item.payload.toJSON();
          a['key'] = item.key;
          return a;
        });
        this._todos.next(Object.assign({}, this.dataStore).cotizaciones);
      }
    );
  }

  actualizarEstadoCotizacion = (usuario: string, key: string, estado: boolean) => this.db.object("cotizacion/" + usuario + "/" + key).update({estado});


}
