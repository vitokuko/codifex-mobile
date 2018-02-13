import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";
import {ListChambreOfEtagePage} from "../list-chambre-of-etage/list-chambre-of-etage";

/**
 * Generated class for the AffinitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-affinite',
  templateUrl: 'affinite.html',
})
export class AffinitePage {

  isAndroid : Boolean = false;
  listPavillon;
  listEtageOfPav;
  etudiantConnected = {
    nom: "mendy",
    prenom: "antoine",
    telephone: "772341245",
    matricule: "2044AZ34",
    sexe:"Homme",
    dateNaissance: "1994-01-04T00:00:00.000Z",
    lieuNaissance: "dakar",
    email: "zito@esp.sn",
    username: "zito",
    id: "5a70904e668f0c0014891232",
    departementId: "5a6ccefebeda0b14a8772bc8",
    optionId: "5a6cceffbeda0b14a8772bcf",
    cycleId: "5a6ccf01beda0b14a8772bdb",
    niveauId: "5a6feb36bf91bc0014a8229c",
    departement: {
      label: "Genie Informatique",
      id: "5a6ccefebeda0b14a8772bc8"
    },
    cycle: {
      label: "DUT",
      nbNiveau: 2,
      id: "5a6ccf01beda0b14a8772bdb"
    },
    option: {
      label: "Reseau et Télecomunication",
      id: "5a6cceffbeda0b14a8772bcf",
      departementId: "5a6ccefebeda0b14a8772bc8"
    },
    niveau: {
      label: "1",
      id: "5a6feb36bf91bc0014a8229c",
      cycleId: "5a6ccf01beda0b14a8772bdb"
    }
  };
  listChambreOfEtage;
  pavillonId;
  etageId;
  constructor(public modalCtrl: ModalController, public dataProvider: DataProvider, public navCtrl: NavController, public navParams: NavParams, public viewController: ViewController, public platfrom: Platform) {
    this.isAndroid = platfrom.is('android');
  }

  openEtageDetailsPage(item) {
   //this.navCtrl.push(ListChambreOfEtagePage, { item: item });
    console.log(item);
    let listChambre = this.modalCtrl.create(ListChambreOfEtagePage , { dataEtage: item });
    listChambre.onDidDismiss(data => {
      console.log(data);
    });
    listChambre.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AffinitePage');
    this.getAllPavillons();
    /*this.nativeStorage.getItem('userAccount')
     .then(
     userId=>{
     console.log(userId);
     this.getEtudiantConnected(userId);
     }
     );*/
  }

  dismiss(){
    this.viewController.dismiss();
  }

  getEtudiantConnected(userId) {
    this.dataProvider.getDataWithId('etudiants', userId + '?filter=' + '{"include":["departement","cycle","option","niveau"]}')
      .then(
        data => {
          console.log(data);
          this.etudiantConnected = data;
        },
        error => console.log(error)
      );
  }

  getAllPavillons() {
    this.dataProvider.getData("pavillons")
      .then(
        data => {
          console.log(data);
          this.listPavillon = data;
          this.pavillonId = this.listPavillon[0]['id'];
          this.getAllEtageOfPav(this.listPavillon[0]['id']);
        },
        error => {
          console.log(error);
        }
      );
  }

  getAllEtageOfPav(pavillonId) {
    this.pavillonId = pavillonId;
    this.listEtageOfPav = [];
    this.dataProvider.getData('pavillonEtages'+'?filter=' + encodeURIComponent('{"where":{"pavillonId":"'+pavillonId+'","demeurant":"'+ this.etudiantConnected.sexe  +'"},"include":"etage"}'))
      .then(
        data => {
          console.log(data);
          this.listEtageOfPav = data;
          this.getListEtageOfPav(this.listEtageOfPav);
          console.log(this.listEtageOfPav);
        },
        error => {
          console.log(error);
        }
      );
  }

  getListEtageOfPav(data){
    data.forEach(function (value) {
      value.label = value.etage.label;
      value.identifiant = value.etage.id;
    })
  }



}
