import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularModule } from './angular.module';
import { PromocionesModule } from './promociones/promociones.module';
import { ServiciosModule } from './servicios/servicios.module';
import { PersonalModule } from './personal/personal.module';
import { Servicio1Service } from './servicios/service/servicios1.service';
import { Servicio2Service } from './servicios/service/servicios2.service';
import { Servicio3Service } from './servicios/service/servicios3.service';
import { Servicio4Service } from './servicios/service/servicios4.service';
import { Servicio5Service } from './servicios/service/servicios5.service';
import { Servicio6Service } from './servicios/service/servicios6.service';
import { CotizacionService } from './servicios/service/cotizacion.service';
import { UsuariosService } from './servicios/service/usuarios.service';
import { CotizacionDetallesService } from './servicios/service/cotizacion_detalles.service';

import {TranslateModule, TranslateLoader, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import localeES from '@angular/common/locales/es-EC';
import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PersonalService } from './personal/service/personal.service';
import { InteraccionService } from './personal/service/interaccion.service';
registerLocaleData(localeES, 'es');

// import { RatingModule } from 'ng-starrating';
import { ChatModule } from './chat/chat.module';
import { ChatService } from './chat/service/chat.service';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    ServiciosModule,
    PromocionesModule,
    PersonalModule,
    HttpClientModule,
    ChatModule,
    // RatingModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })],
  providers: [
    Servicio1Service,
    Servicio2Service,
    Servicio3Service,
    Servicio4Service,
    Servicio5Service,
    Servicio6Service,
    CotizacionService,
    CotizacionDetallesService,
    UsuariosService,
    PersonalService,
    InteraccionService,
    ChatService,
    {provide: MAT_DATE_LOCALE, useValue: 'es-EC'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private translate: TranslateService, private adapter: DateAdapter<any>){
    translate.addLangs(['es']);
    translate.setDefaultLang('es');
    translate.use('es');
  }

  setDateAdapterLocale(localeString: string): void {
    this.adapter.setLocale(localeString);
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
