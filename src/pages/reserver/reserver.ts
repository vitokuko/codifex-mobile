import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular/platform/platform';

/**
 * Generated class for the ReserverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reserver',
  templateUrl: 'reserver.html',
})
export class ReserverPage {
  
  isAndroid : Boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public platform:Platform) {
    this.isAndroid = platform.is('android');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReserverPage');
  }

}
