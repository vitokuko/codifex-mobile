import { SettingsPage } from './../settings/settings';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

/**
 * Generated class for the ComptePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-compte',
  templateUrl: 'compte.html',
})
export class ComptePage {

  isAndroid : Boolean =false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewController:ViewController, public platform:Platform) {
    this.isAndroid = platform.is('android');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComptePage');
  }

  dismiss() {
    this.navCtrl.setRoot(SettingsPage);
  }
}
