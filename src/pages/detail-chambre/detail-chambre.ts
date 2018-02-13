import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";

/**
 * Generated class for the DetailChambrePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-chambre',
  templateUrl: 'detail-chambre.html',
})
export class DetailChambrePage {

  isAndroid: Boolean = false;
  listEtudiantCodifierChambre;
  hidden : Boolean = false;
  etudiantConnected;
  chambreSelected;
  pavillonEtageId;
  etageId;
  pavillonId;


  constructor(public platform:Platform,public navCtrl: NavController, public navParams: NavParams, public viewController: ViewController, public dataProvider: DataProvider, public alertCtrl:AlertController) {
    this.isAndroid = platform.is('android');
    console.log(navParams.get('detailChambre'));
    this.listEtudiantCodifierChambre = navParams.get('detailChambre').positions;
    this.chambreSelected = navParams.get('detailChambre').id;
    this.pavillonEtageId = navParams.get('detailChambre').pavillonEtageId;
    this.etudiantConnected = navParams.get('etudiantConnected');
    console.log(this.listEtudiantCodifierChambre);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailChambrePage');
    this.getEtageIdPavillonId();
    this.isReserve();
    console.log(this.hidden);
  }

  dismiss() {
    this.viewController.dismiss();
  }

  getEtageIdPavillonId(){
    console.log(this.pavillonEtageId);
    this.dataProvider.getDataWithId('pavillonEtages',this.pavillonEtageId)
      .then(
        data => {
          console.log(data);
          this.etageId = data.etageId;
          this.pavillonId = data.pavillonId;
        },
        error => console.log(error)
      );
  }


  isReserve() {
    let etudiantReserve = [];
    this.dataProvider.getData('positions')
      .then(
        data => {
          console.log(data);
          etudiantReserve = data;
          this.verifiEtudiantReserve(etudiantReserve);
          console.log(this.hidden);
        },
        error => console.log(error)
      )
  }

  //verifi parmis les etudiants qui ont deja codifier
  verifiEtudiantReserve(data) {
    let i = 0;
    console.log(data);
    while (i < data.length && this.hidden == false) {
      console.log("etudiantConnected : ",this.etudiantConnected.id," chercheEatudiant : ",data[i].etudiantId);
      if ((this.etudiantConnected.id != data[i].etudiantId) && (i == data.length-1)) {
        this.hidden = true;
      }
      i++;
    }
  }

  reserver() {
    this.dataProvider.getData('chambres/' + this.chambreSelected + '/positions')
      .then(
        data => {
          console.log(data);
          this.positionReserver(data.length);
        },
        error => {
          console.log(error);
        }
      );
  }

  positionReserver(value) {
    let etudiantConnectReserver = [];
    etudiantConnectReserver.push(
      {
        label: value + 1,
        dateCodification: new Date(),
        status: "reserver",
        etudiantId: this.etudiantConnected.id,
        chambreId: this.chambreSelected
      });
    this.dataProvider.getData('pavillonEtages?filter=' + encodeURIComponent('{"where":{"etageId":"' + this.etageId + '", "pavillonId":"' + this.pavillonId + '"},"include":"etage"}'))
      .then(
        data => {
          console.log(data);
          if (data[0]['etage'].nombrePosition <= 4) {
            this.dataProvider.addData('positions', etudiantConnectReserver)
              .then(
                data => {
                  console.log(data);
                  this.doAlert();
                  this.dismiss();
                },
                error => console.log(error)
              )
          } else {
            console.log("chambre full");
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  doAlert() {
    let alert = this.alertCtrl.create({
      title: 'Successfully!',
      subTitle: 'veuillez verifier votre mail pour valider!',
      buttons: ['Ok']
    });

    alert.present();
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirm purchase',
      message: 'Veuillez confirmé pour valider la codification?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirmé',
          handler: () => {
            console.log('Confirmé clicked');
            this.reserver();

          }
        }
      ]
    });
    alert.present();
  }
}
