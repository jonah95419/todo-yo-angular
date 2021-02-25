import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import localeES from '@angular/common/locales/es-EC';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy, registerLocaleData } from '@angular/common';
registerLocaleData(localeES, 'es');

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { ChatModule } from './chat/chat.module';
import { AngularModule } from './angular.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ChatModule,
    AngularModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "todo-yo"),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    AngularFirestore,
    { provide: MAT_DATE_LOCALE, useValue: 'es-EC' },
    { provide: LocationStrategy, useClass: PathLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private translate: TranslateService, private adapter: DateAdapter<any>) {
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
