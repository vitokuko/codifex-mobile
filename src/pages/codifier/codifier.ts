import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams,Platform} from 'ionic-angular';
import {AffinitePage} from "../affinite/affinite";
import {DataProvider} from "../../providers/data/data";

/**
 * Generated class for the CodifierPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-codifier',
  templateUrl: 'codifier.html',
})
export class CodifierPage {

  isAndroid : Boolean = false;
  listPavillon;
  listEtage;
  listChambreOfEtage;
  pavillonId;
  etageId;
  chambreId;
  urlPavEtage = 'pavillonEtages';
  constructor(public navCtrl: NavController, public navParams: NavParams , public platform: Platform,public modalCtrl: ModalController, public dataProvider: DataProvider) {
    this.isAndroid = platform.is('android');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CodifierPage');
    this.getAllPavillons();
    this.getAllInformationOfPav();
  }

  goAffinite(){
    let affinite = this.modalCtrl.create(AffinitePage);
    affinite.onDidDismiss(data => {
      console.log(data);
    });
    affinite.present();
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

  getDataEtageOfPavilon(pavillonId){
    this.listEtage = [];
    this.pavillonId = pavillonId;
    this.dataProvider
      .getData(
        this.urlPavEtage +
        "?filter=" +
        '{"include":["etage","pavillon"],"where":{"pavillonId":"'+ pavillonId +'"}}'
      )
      .then(
        data => {
          console.log(data);
          this.listEtage = data;
        },
        error => console.log(error)
      );
  }

  getAllChambreOfEtage(etageId){
    this.etageId = etageId;
    console.log("pavId",this.pavillonId, "etageId", etageId);
    this.dataProvider.getData('pavillonEtages?filter=' + encodeURIComponent('{"where":{"etageId":"'+ etageId +'", "pavillonId":"'+ this.pavillonId +'"},"include":{"chambres":{"positions":{"etudiant":["departement","option","cycle","niveau"]}}}}'))
      .then(
        data => {
          console.log(data);
          this.listChambreOfEtage = data[0].chambres;
          //TODO calcule affinité sur l'autre page
         //this.handleAffinite(this.listChambreOfEtage);
          console.log(this.listChambreOfEtage);
        },
        error => {
          console.log(error);
        }
      );
  }

  getChambreSelected(chambreId){
    this.chambreId = chambreId;
    console.log(this.chambreId);
  }

  handleAffinite(chambres){
    //TODO native storage recuperer les infos de l'etudiant
    let etudiant = null;
    chambres.forEach(function(chambre){
      chambre.affinite = 0;
      if (chambre.positions.length == 0){
        chambre.affinite = 5;
      }else{
        chambre.affinite = 0;
        chambre.positions.forEach(function (position) {
          if(position.etudiant.option.label == etudiant.option.label){
            chambre.affinite += 50;
          }
          if(position.etudiant.departement.label == etudiant.departement.label){
            chambre.affinite += 25;
          }
          if(position.etudiant.niveau.label == etudiant.niveau.label){
            chambre.affinite += 15;
          }
          if(position.etudiant.cycle.label == etudiant.cycle.label){
            chambre.affinite += 10;
          }

        });
        chambre.affinite = chambre.affinite / 4;
      }
    })
  }

  getAllInformationOfPav(){
    this.dataProvider.getData('pavillonEtages?filter='+'{"include":["etage","pavillon",{"chambres":{"positions":{"etudiant":["departement","option","cycle","niveau"]}}}]}')
      .then(
        data => {
          console.log(data);
        },
        error => console.log(error)
      );
  }


}
