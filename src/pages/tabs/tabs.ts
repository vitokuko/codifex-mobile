import { Component } from '@angular/core';
import { CodifierPage } from '../codifier/codifier';
import { HomePage } from '../home/home';
import { SettingsPage } from '../settings/settings';
import { Platform } from 'ionic-angular/platform/platform';
import {EchangePage} from "../echange/echange";
import {NavController} from "ionic-angular";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CodifierPage;
  tab4Root = SettingsPage;
  tab5Root = EchangePage;

  isAndroid : Boolean = false;
  constructor(public platform: Platform,public navCtrl:NavController) {
      this.isAndroid = platform.is('android');
  }
}
