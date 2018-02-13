import { Component } from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { DetailPavPage } from '../detail-pav/detail-pav';
import {DataProvider} from "../../providers/data/data";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  isAndroid: boolean = false;
  listPavillon : any;

  constructor(public navCtrl: NavController,public platform: Platform, public navParams: NavParams, public modalCtrl: ModalController, public dataProvider:DataProvider) {
    this.isAndroid = platform.is('android');
    console.log('EtudiantConnected : ',navParams.get('etudiantConnected'));
    let eventSource = new window['EventSource']("http://codifex-api.herokuapp.com/api/pavillons/change-stream? format=change-stream");
    eventSource.addEventListener('data', function(msg) {
      let raw = msg.data;
      let data = JSON.parse(raw);
      document.getElementById("unique").click();
      console.log(data); // => change obj
    });
  }


  ionViewDidLoad(){
    this.getAllPavillons();
  }

  goDetailPav(pavillonId){
    let detailPav = this.modalCtrl.create(DetailPavPage , {pavillonId : pavillonId});
    detailPav.onDidDismiss(data => {
        console.log(data);
    });
    detailPav.present();
  }

  getAllPavillons(){
    this.dataProvider.getData("pavillons")
      .then(
        data => {
          this.listPavillon = data;
          console.log(data);
        },
        error => console.log(error)
      );
  }

  initialize(){
    this.getAllPavillons();
  }

}
