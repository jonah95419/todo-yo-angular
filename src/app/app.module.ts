import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
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
registerLocaleData(localeES, 'es');

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
    ServiciosModule,
    PromocionesModule,
    PersonalModule,
    HttpClientModule,
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
    UsuariosService
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
