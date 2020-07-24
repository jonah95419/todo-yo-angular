import { Component, OnInit, Input, SimpleChanges, OnChanges, ViewChild, ElementRef, AfterViewChecked, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from '@angular/fire/storage';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChatService } from '../service/chat.service';
import { chatI } from '../model/chat';

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.css']
})
export class ChatComponent implements OnInit, OnChanges, AfterViewChecked {

  @ViewChild('chat', {static: false}) chat: ElementRef;
  @ViewChild('mensaje', {static: false}) mensaje: ElementRef;

  @Input() key: string;
  @Input() usuario: any;

  chats$: Observable<chatI[]>;
  uploadPercent$: Observable<number>;

  chatForm: FormGroup;

  uploadEstado: boolean = false;
  imagen: boolean = false;

  imageSrc: any;
  file: File | null = null;


  constructor(
    private afStorage: AngularFireStorage,
    private formBuilder: FormBuilder,
    private chatApi: ChatService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog ) { }

  ngOnInit(): void {
    this.chatForm = this.formBuilder.group({
      'mensaje' : [null, Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.key !== undefined){
      this.obtenerChat();
    }
  }

  ngAfterViewChecked(): void {
    const bottom_px = this.mensaje.nativeElement.offsetHeight;
    const heigth = window.innerHeight - Number(bottom_px) - 70;
    this.chat.nativeElement.style.height = heigth+'px';
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
        this.chat.nativeElement.scrollTop = this.chat.nativeElement.scrollHeight;
    } catch(err) { }
  }

  onFormSubmit(form: any) {
    if(this.imagen) {
      this.cargarImagen(form.mensaje);
    } else {
      this.chatApi.enviarMensaje(this.key, this.usuario.key, form.mensaje)
    }
    this.chatForm = this.formBuilder.group({
      'mensaje' : [null, Validators.required]
    });
  }

  cancelarImagen() {
    this.imageSrc = undefined;
    this.imagen = false;
    this.file = null;
  }

  onFileSelected = (event):void => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.file = <File>event.target.files[0];
      const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.file));
      this.imageSrc = url;
      this.imagen = true;
    }
  }

  openDialog(imagen: string) {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      data: { imagen },
      panelClass: 'custom-dialog-container'
    });

  }

  private cargarImagen = (mensaje): void => {
    this.uploadEstado = true;
    const fileRef: AngularFireStorageReference = this.afStorage.ref( "imagenes_chat/" + this.key + "/" + this.file.name  );
    const task: AngularFireUploadTask = this.afStorage.upload("imagenes_chat/" + this.key + "/" + this.file.name, this.file);
    this.uploadPercent$ = task.percentageChanges();
    task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(downloadURL => {
            this.chatApi.enviarMensajeImagen(this.key, this.usuario.key, mensaje, downloadURL)
            this.uploadEstado = false;
            this.imagen = false;
            this.file = undefined;
          });
        })
      ).subscribe();
  }

  private obtenerChat = () => {
    this.chats$ = this.chatApi.cargarTodo(this.key, this.usuario?.key);
  }

}


@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

}
