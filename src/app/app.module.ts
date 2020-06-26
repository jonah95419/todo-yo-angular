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
import { ServiciosAlbanieleriaService } from './servicios/service/servicios_albanieleria.service';
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
    // RatingModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ],
  providers: [
    ServiciosAlbanieleriaService,
    CotizacionService,
    CotizacionDetallesService,
    UsuariosService,
    PersonalService,
    InteraccionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private translate: TranslateService){
    translate.addLangs(['es']);
    translate.setDefaultLang('es');
    translate.use('es');
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
