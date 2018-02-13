import { ViewController } from 'ionic-angular/navigation/view-controller';
import { ComptePage } from './../compte/compte';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular/platform/platform';
import {LoginPage} from "../login/login";

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  isAndroid : Boolean = false;
  constructor(public platform:Platform,public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController) {
    this.isAndroid = platform.is('android');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  goCompte(){
    this.navCtrl.setRoot(ComptePage);
  }

  disconnected(){
   // this.navCtrl.setRoot(LoginPage);
    this.navCtrl.parent.viewCtrl.dismiss();
    //console.log();
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }
}
