import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Servicio5Service {

  private _todos = new BehaviorSubject<any[]>([]);
  private dataStore: { usuarios: any[] } = { usuarios: [] };
  readonly todos = this._todos.asObservable();

  constructor(private db: AngularFireDatabase) { }

  cargarTodo = () => {
     this.db.list('servicio/servicio5').snapshotChanges().subscribe(
      (data: any[]) => {
        this.dataStore.usuarios = data.map( item => item.payload.toJSON());
        this._todos.next(Object.assign({}, this.dataStore).usuarios);
      }
    );
  }
}
