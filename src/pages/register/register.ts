import { Component } from '@angular/core';
import {
  ActionSheetController, AlertController, IonicPage, LoadingController, NavController,
  NavParams
} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginPage} from "../login/login";

//declare function unescape(s:string): string;
//declare function escape(s:string): string;

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  password = "";
  signupForm: FormGroup;

  user = {
    firstName : "",
    lastName : "",
    phone: "",
    username: "",
    password: "",
    mail: "",
    photoProfil : ""
  };
  photoProfil = {"type":"photo","link":"","linkSecure":""};
  loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public actionSheetCtrl : ActionSheetController
  ) {
    this.signupForm = formBuilder.group({
      firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      phone: ['', Validators.compose([Validators.maxLength(17), Validators.pattern('[0-9]+'), Validators.required])],
      username: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(8), Validators.required])],
      mail: ['', Validators.compose([Validators.required])] ,
      photoProfil: ['', Validators.compose([])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  doSignup() {

  }

  performSign() {

  }

  base64Image = "";
  takeApicture() {

  }

  accessGallery(){

  }

  goBack() {
    this.navCtrl.pop();
  }

  modeTakeImage() {

  }

  /*uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'esp', uploadPreset: 'guqjezve' })
  );*/

  uploadImage() {
   /* let blob = this.dataURItoBlob(this.base64Image);
    let file = new File([blob], 'fileName.jpeg', {type: "'image/jpeg"});
    this.uploader.addToQueue([file]);
    this.uploader.uploadAll();*/
  }

  dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    /*var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type:mimeString});*/
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Inscription...'
    });
    this.loading.present();
  }

  showReussite(text) {
    let alert = this.alertCtrl.create({
      title: 'Inscription réussie',
      subTitle: text,
      buttons: ['Ok']
    });
    alert.present();
  }

  login(){
    this.navCtrl.setRoot(LoginPage);
  }

}
