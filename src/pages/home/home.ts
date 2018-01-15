import { Component } from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { DetailPavPage } from '../detail-pav/detail-pav';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  isAndroid: boolean = false;
  listPavillon = [
    {
      libelle : "Pavillon A"
    },
    {
      libelle: "Pavillon B"
    },
    {
      libelle: "Pavillon C"
    },
    {
      libelle: "Pavillon D"
    },
  ];

  constructor(public navCtrl: NavController,public platform: Platform, public navParams: NavParams, public modalCtrl: ModalController) {
    this.isAndroid = platform.is('android');
  }

  goDetailPav(pavillon){
    let detailPav = this.modalCtrl.create(DetailPavPage , {pavillon : pavillon});
    detailPav.onDidDismiss(data => {
        console.log(data);
    });
    detailPav.present();
  }

}
