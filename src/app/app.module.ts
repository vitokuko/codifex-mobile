import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {CodifierPage} from "../pages/codifier/codifier";
import {RegisterPage} from "../pages/register/register";
import {ForgotPasswordPage} from "../pages/forgot-password/forgot-password";
import { DetailPavPage } from '../pages/detail-pav/detail-pav';
import { ComptePage } from '../pages/compte/compte';
import {EchangePage} from "../pages/echange/echange";
import {DataProvider} from "../providers/data/data";
import {HttpClientModule} from "@angular/common/http";
import {NativeStorage} from "@ionic-native/native-storage";
import {AffinitePage} from "../pages/affinite/affinite";
import {ConfirmeCodifierPage} from "../pages/confirme-codifier/confirme-codifier";
import {ListChambreOfEtagePage} from "../pages/list-chambre-of-etage/list-chambre-of-etage";
import {ProgressBarModule} from "angular-progress-bar";
import {DetailChambrePage} from "../pages/detail-chambre/detail-chambre";


@NgModule({
  declarations: [
    MyApp,
    CodifierPage,
    HomePage,
    SettingsPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    DetailPavPage,
    ComptePage,
    EchangePage,
    AffinitePage,
    ConfirmeCodifierPage,
    ListChambreOfEtagePage,
    DetailChambrePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    ProgressBarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CodifierPage,
    SettingsPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    DetailPavPage,
    ComptePage,
    EchangePage,
    AffinitePage,
    ConfirmeCodifierPage,
    ListChambreOfEtagePage,
    DetailChambrePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    NativeStorage
  ]
})
export class AppModule {}
