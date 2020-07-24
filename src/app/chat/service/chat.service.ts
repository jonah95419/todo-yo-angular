import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject, SnapshotAction } from '@angular/fire/database';  // Firebase modules for Database
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireStorage } from 'angularfire2/storage';
import { map } from 'rxjs/operators';
import { ChatI  } from '../model/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private db: AngularFireDatabase) { }

  cargarTodo = (id: string, usuario: string): Observable<ChatI[]> => {
    return this.db.list('chat/' + usuario + "/" + id).snapshotChanges().pipe(
      map((data: any[]) => data.map( item => {
          let a = item.payload.toJSON();
          a['key'] = item.key;
          return a;
        })
      )
    )
  }

  enviarMensaje = (id: string, usuario: string, mensaje) => {
    this.db.list('chat/' + usuario + "/" + id).push({mensaje, nombre: "admin", tipoMensaje: "1", local: -1})
  }

  enviarMensajeImagen = (id: string, usuario: string, mensaje, urlFoto) => {
    this.db.list('chat/' + usuario + "/" + id).push({mensaje, nombre: "admin", tipoMensaje: "2", urlFoto, local: -1})
  }

}
