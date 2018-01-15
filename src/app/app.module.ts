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
import {ReserverPage} from "../pages/reserver/reserver";
import { AuthProvider } from '../providers/auth/auth';
import {RegisterPage} from "../pages/register/register";
import {ForgotPasswordPage} from "../pages/forgot-password/forgot-password";
import { DetailPavPage } from '../pages/detail-pav/detail-pav';

@NgModule({
  declarations: [
    MyApp,
    CodifierPage,
    ReserverPage,
    HomePage,
    SettingsPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    DetailPavPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CodifierPage,
    ReserverPage,
    SettingsPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    DetailPavPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})
export class AppModule {}
