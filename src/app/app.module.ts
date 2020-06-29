import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { PromocionesModule } from './promociones/promociones.module';
import { ServiciosModule } from './servicios/servicios.module';
import { PersonalModule } from './personal/personal.module';

import {TranslateModule, TranslateLoader, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import localeES from '@angular/common/locales/es-EC';
import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
registerLocaleData(localeES, 'es');

// import { RatingModule } from 'ng-starrating';
import { ChatModule } from './chat/chat.module';
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
