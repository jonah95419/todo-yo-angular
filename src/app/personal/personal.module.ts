import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalComponent } from './personal/personal.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AngularModule } from '../angular.module';
import { InformacionComponent } from './informacion/informacion.component';
import { RendimientoComponent } from './rendimiento/rendimiento.component';
import { HistorialComponent } from './historial/historial.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DragDirective } from './informacion/dragDrop.Directive';
import { RatingModule } from 'ng-starrating';
import { ChatService } from '../chat/service/chat.service';
import { InteraccionService } from './service/interaccion.service';
import { PersonalService } from './service/personal.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment.prod';
import { PersonalRoutingModule } from './personal-routing.module';


@NgModule({
  declarations: [PersonalComponent, PerfilComponent, InformacionComponent, RendimientoComponent, HistorialComponent, DragDirective],
  imports: [
    PersonalRoutingModule,
    CommonModule,
    AngularModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    RatingModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
  ],
  providers: [
    PersonalService,
    InteraccionService,
    ChatService,
  ]
})
export class PersonalModule { }
