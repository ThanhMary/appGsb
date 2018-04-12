import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, Injectable } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
//import {LOCALE_ID} from '@angular/core';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
 
import { SQLite } from '@ionic-native/sqlite'
import { DatabaseProvider } from '../providers/database/database';
import { ProductProvider } from '../providers/product/product';
import { CategoryProvider } from '../providers/category/category';
 
@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
 
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  //  {provide: LOCALE_ID, useValue: 'fr-FR'},
    SQLite,
    DatabaseProvider,
    ProductProvider,
    CategoryProvider
  ]
})
export class AppModule {
 }