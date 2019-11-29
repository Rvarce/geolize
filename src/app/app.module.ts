import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from "@angular/common/http";

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { firebaseConfig } from "../environments/environment";

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { AutosizeDirective } from './directive/autosize.directive';

import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [AppComponent, AutosizeDirective],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    ReactiveFormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    NativeGeocoder,
    BarcodeScanner,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
