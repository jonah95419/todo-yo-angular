import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Servicio4Service {

  private _todos = new BehaviorSubject<any[]>([]);
  private dataStore: { servicios4: any[] } = { servicios4: [] };
  readonly todos = this._todos.asObservable();

  constructor(private db: AngularFireDatabase) { }

  cargarTodo = () => {
     this.db.list('servicio/servicio4').snapshotChanges().subscribe(
      (data: any[]) => {
        this.dataStore.servicios4 = data.map( item => {
          let a = item.payload.toJSON();
          a['key'] = item.key;
          return a;
        });
        this._todos.next(Object.assign({}, this.dataStore).servicios4);
      }
    );
  }
}
