import {Component} from '@angular/core';
import {
  AlertController, IonicPage, ModalController, NavController, NavParams, Platform,
  ViewController
} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";
import {DetailChambrePage} from "../detail-chambre/detail-chambre";
import {NativeStorage} from "@ionic-native/native-storage";

/**
 * Generated class for the ListChambreOfEtagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-chambre-of-etage',
  templateUrl: 'list-chambre-of-etage.html',
})
export class ListChambreOfEtagePage {

  isAndroid: Boolean = false;
  dataEtage = {
    etageId: '',
    pavillonId: ''
  };
  etudiantConnected = {
    nom: "mendy",
    prenom: "antoine",
    telephone: "772341245",
    matricule: "2044AZ34",
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
  etageId;
  pavillonId;
  listChambreOfEtage;
  //etudiantConnected;

  constructor(public platfrom: Platform, public navCtrl: NavController, public navParams: NavParams, public viewController: ViewController, public dataProvider: DataProvider, public modalCtrl:ModalController, public alertCtrl:AlertController, public nativeStorage:NativeStorage) {
    this.isAndroid = platfrom.is('android');
    this.dataEtage = navParams.get('dataEtage');
  }

  ionViewDidLoad() {
    /*this.nativeStorage.getItem('userAccount')
      .then(
        userId=>{
          console.log(userId);
          this.getEtudiantConnected(userId);
        }
      );*/
    console.log('ionViewDidLoad ListChambreOfEtagePage');
    console.log("Enter list chambre :", this.dataEtage);
    this.etageId = this.dataEtage.etageId;
    this.pavillonId = this.dataEtage.pavillonId;
    this.getAllChambreOfEtage();
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

  dismiss() {
    this.viewController.dismiss();
  }

  getAllChambreOfEtage() {
    console.log("pavId", this.pavillonId, "etageId", this.etageId);
    this.dataProvider.getData('pavillonEtages?filter=' + encodeURIComponent('{"where":{"etageId":"' + this.etageId + '", "pavillonId":"' + this.pavillonId + '"},"include":{"chambres":{"positions":{"etudiant":["departement","option","cycle","niveau"]}}}}'))
      .then(
        data => {
          console.log(data);
          this.listChambreOfEtage = data[0].chambres;
          this.handleAffinite(this.listChambreOfEtage);
          console.log(this.listChambreOfEtage);
        },
        error => {
          console.log(error);
        }
      );
  }

  handleAffinite(chambres) {
    let etudiant = this.etudiantConnected;
    chambres.forEach(function (chambre) {
      chambre.affinite = 0;
      if (chambre.positions.length == 0) {
        chambre.affinite = 5;
      } else {
        chambre.affinite = 0;
        chambre.positions.forEach(function (position) {
          if (position.etudiant.option.label == etudiant.option.label) {
            chambre.affinite += 50;
          }
          if (position.etudiant.departement.label == etudiant.departement.label) {
            chambre.affinite += 25;
          }
          if (position.etudiant.niveau.label == etudiant.niveau.label) {
            chambre.affinite += 15;
          }
          if (position.etudiant.cycle.label == etudiant.cycle.label) {
            chambre.affinite += 10;
          }

        });
        chambre.affinite = chambre.affinite / 4;
      }
    })
  }


  detailChambre(value){
    let detailChambre = this.modalCtrl.create(DetailChambrePage, {detailChambre: value,etudiantConnected:this.etudiantConnected});
    detailChambre.onDidDismiss(data => {
      console.log(data);
      this.getAllChambreOfEtage();
    });
    detailChambre.present();
  }
}
